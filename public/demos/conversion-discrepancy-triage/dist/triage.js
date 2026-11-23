const validIsoDate = (value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(value))
        return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
function parseCsvRows(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;
    let closedQuote = false;
    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        if (inQuotes) {
            if (character === '"' && text[index + 1] === '"') {
                cell += '"';
                index += 1;
            }
            else if (character === '"') {
                inQuotes = false;
                closedQuote = true;
            }
            else
                cell += character;
        }
        else if (character === '"' && cell === "" && !closedQuote)
            inQuotes = true;
        else if (character === ",") {
            row.push(cell);
            cell = "";
            closedQuote = false;
        }
        else if (character === "\n" || character === "\r") {
            if (character === "\r" && text[index + 1] === "\n")
                index += 1;
            row.push(cell);
            cell = "";
            closedQuote = false;
            if (row.some((value) => value.trim()))
                rows.push(row);
            row = [];
        }
        else if (closedQuote || character === '"')
            throw new Error("Invalid characters around a quoted CSV field.");
        else
            cell += character;
    }
    if (inQuotes)
        throw new Error("A quoted CSV field was not closed.");
    row.push(cell);
    if (row.some((value) => value.trim()))
        rows.push(row);
    return rows;
}
export function parseCsv(text, name) {
    const rows = parseCsvRows(text.replace(/^\uFEFF/u, ""));
    const header = rows.shift()?.map((cell) => cell.trim().toLocaleLowerCase("en-US"));
    if (!header)
        throw new Error(`${name}: file is empty.`);
    if (new Set(header).size !== header.length)
        throw new Error(`${name}: column names must be unique.`);
    const indexes = { date: header.indexOf("date"), event: header.indexOf("event"), conversions: header.indexOf("conversions") };
    if (Object.values(indexes).some((index) => index < 0))
        throw new Error(`${name}: expected date,event,conversions columns.`);
    if (!rows.length)
        throw new Error(`${name}: add at least one data row.`);
    const parsed = rows.map((cells, index) => {
        const line = index + 2;
        const date = cells[indexes.date]?.trim() ?? "";
        const event = cells[indexes.event]?.trim() ?? "";
        const value = cells[indexes.conversions]?.trim() ?? "";
        const conversions = Number(value);
        if (!validIsoDate(date))
            throw new Error(`${name}, row ${line}: use a valid YYYY-MM-DD date.`);
        if (!event)
            throw new Error(`${name}, row ${line}: event cannot be blank.`);
        if (cells.length !== header.length)
            throw new Error(`${name}, row ${line}: column count does not match the header.`);
        if (!/^\d+(?:\.\d+)?$/u.test(value) || !Number.isFinite(conversions) || conversions > Number.MAX_SAFE_INTEGER)
            throw new Error(`${name}, row ${line}: conversions must be a non-negative number in decimal notation.`);
        return { date, event, conversions };
    });
    return { name, rows: parsed };
}
function dateRange(report, event) {
    const dates = report.rows.filter((row) => row.event === event).map((row) => row.date).sort();
    return dates.length ? { start: dates[0], end: dates[dates.length - 1] } : undefined;
}
function sourceRange(range) {
    return range ? `${range.start} – ${range.end}` : "No dated rows";
}
function dailyTotals(report, event, start, end) {
    const totals = new Map();
    for (const row of report.rows) {
        if (row.event !== event || row.date < start || row.date > end)
            continue;
        totals.set(row.date, (totals.get(row.date) ?? 0) + row.conversions);
    }
    return totals;
}
const basisLabel = { event_time: "Conversion time", interaction_time: "Interaction time", session_time: "Session time" };
const attributionLabel = { data_driven: "Data-driven", last_click: "Last click", google_paid: "Google paid channels", paid_organic: "Paid + organic channels" };
const hoursLabel = (value) => value === undefined ? "Unknown" : `${value} hours old`;
export function assess(input) {
    const { reportA, reportB, eventA, eventB, mappedEvent } = input;
    const rangeA = dateRange(reportA, eventA);
    const rangeB = dateRange(reportB, eventB);
    const overlap = rangeA && rangeB ? { start: rangeA.start > rangeB.start ? rangeA.start : rangeB.start, end: rangeA.end < rangeB.end ? rangeA.end : rangeB.end } : undefined;
    const hasOverlap = Boolean(overlap && overlap.start <= overlap.end);
    const mappingReady = Boolean(rangeA && rangeB && mappedEvent.trim());
    const validFreshness = (hours) => hours !== undefined && Number.isFinite(hours) && hours >= 0;
    const settingsKnown = Boolean(reportA.basis && reportB.basis && reportA.attribution && reportB.attribution && validFreshness(reportA.freshnessHours) && validFreshness(reportB.freshnessHours));
    const basisState = !reportA.basis || !reportB.basis ? "unknown" : reportA.basis === reportB.basis ? "aligned" : "different";
    const attributionState = !reportA.attribution || !reportB.attribution ? "unknown" : reportA.attribution === reportB.attribution ? "aligned" : "different";
    const freshnessState = reportA.freshnessHours === undefined || reportB.freshnessHours === undefined ? "unknown" : Math.min(reportA.freshnessHours, reportB.freshnessHours) < 48 ? "different" : "aligned";
    const dateEvidenceValue = !rangeA || !rangeB
        ? `${sourceRange(rangeA)} · ${sourceRange(rangeB)}`
        : rangeA.start === rangeB.start && rangeA.end === rangeB.end
            ? `Both selected events: ${sourceRange(rangeA)}`
            : `A: ${sourceRange(rangeA)} · B: ${sourceRange(rangeB)}${hasOverlap && overlap ? ` · shared: ${overlap.start} – ${overlap.end}` : ""}`;
    const evidence = [
        { label: "Date range", value: dateEvidenceValue, state: hasOverlap ? (rangeA?.start === rangeB?.start && rangeA?.end === rangeB?.end ? "aligned" : "different") : "unknown" },
        { label: "Event mapping", value: mappingReady ? `${eventA} + ${eventB} → ${mappedEvent.trim()}` : "Choose one event in each report and the shared business event.", state: mappingReady ? "aligned" : "unknown" },
        { label: "Reporting basis", value: reportA.basis && reportB.basis ? `${basisLabel[reportA.basis]} · ${basisLabel[reportB.basis]}` : "Unknown", state: basisState },
        { label: "Attribution", value: reportA.attribution && reportB.attribution ? `${attributionLabel[reportA.attribution]} · ${attributionLabel[reportB.attribution]}` : "Unknown", state: attributionState },
        { label: "Data freshness", value: `${hoursLabel(reportA.freshnessHours)} · ${hoursLabel(reportB.freshnessHours)}`, state: freshnessState },
    ];
    if (!mappingReady)
        return {
            status: "insufficient", title: "Insufficient evidence", explanation: "The source events have not both been mapped to the same business action.", nextStep: "Choose the matching event in each report and name the shared business event before comparing totals.", evidence,
        };
    if (!overlap || !hasOverlap)
        return {
            status: "insufficient", title: "Insufficient evidence", explanation: "The selected events have no overlapping date range.", nextStep: "Export both reports for at least one shared date range, then compare again.", evidence,
        };
    if (!settingsKnown)
        return {
            status: "insufficient", title: "Insufficient evidence", explanation: "At least one report is missing a declared reporting basis, attribution setting, or freshness value.", nextStep: "Check the report details and enter the missing settings; the tool will not infer them from the totals.", evidence,
        };
    const dailyA = dailyTotals(reportA, eventA, overlap.start, overlap.end);
    const dailyB = dailyTotals(reportB, eventB, overlap.start, overlap.end);
    const expectedDays = (Date.parse(overlap.end) - Date.parse(overlap.start)) / 86_400_000 + 1;
    const coverageComplete = dailyA.size === expectedDays && dailyB.size === expectedDays;
    evidence.push({
        label: "Daily coverage",
        value: `A: ${dailyA.size}/${expectedDays} days · B: ${dailyB.size}/${expectedDays} days`,
        state: coverageComplete ? "aligned" : "different",
    });
    if (!coverageComplete)
        return {
            status: "insufficient", title: "Insufficient evidence", explanation: "At least one selected event has missing days in the shared range. A missing row could mean no activity or an incomplete export.", nextStep: "Verify the missing days in each source and add explicit zero rows only where the source confirms zero conversions.", evidence, range: overlap,
        };
    const a = [...dailyA.values()].reduce((sum, value) => sum + value, 0);
    const b = [...dailyB.values()].reduce((sum, value) => sum + value, 0);
    if (![a, b].every((value) => Number.isFinite(value) && value <= Number.MAX_SAFE_INTEGER))
        return {
            status: "insufficient", title: "Insufficient evidence", explanation: "At least one cumulative total exceeds the supported numeric range.", nextStep: "Verify the counts and use a smaller date range.", evidence, range: overlap,
        };
    if (a === 0 && b === 0)
        return {
            status: "insufficient", title: "Insufficient evidence", explanation: "Neither selected event has a conversion in the shared date range.", nextStep: "Confirm the event mapping and export range before diagnosing a discrepancy.", evidence, range: overlap,
        };
    const absoluteDifference = Math.abs(a - b);
    const gapPercent = absoluteDifference / Math.max(a, b) * 100;
    const dates = [...dailyA.keys()].sort();
    const alignedRows = dates.map((date) => ({ date, a: dailyA.get(date), b: dailyB.get(date) }));
    const totals = { a, b, absoluteDifference, gapPercent };
    if (reportA.freshnessHours < 48 || reportB.freshnessHours < 48)
        return {
            status: "provisional", title: "Recheck after processing", explanation: "The newest included date is under 48 hours old in at least one report. This is a review threshold; late attribution updates can continue afterwards.", nextStep: "Wait for processing, then export again and compare the same event and dates.", evidence, range: overlap, totals, alignedRows,
        };
    const mismatches = [basisState === "different" ? "reporting basis" : "", attributionState === "different" ? "attribution" : ""].filter(Boolean);
    if (mismatches.length)
        return {
            status: "settings-mismatch", title: "Declared settings differ", explanation: `The aligned totals differ by ${absoluteDifference.toLocaleString()} (${gapPercent.toFixed(1)}% of the larger total), and the reports use different ${mismatches.join(" and ")}. This difference may affect the comparison; it does not prove the setting caused the gap.`, nextStep: `Align ${mismatches.join(" and ")} for the next report pair, then rerun this comparison.`, evidence, range: overlap, totals, alignedRows,
        };
    if (absoluteDifference === 0)
        return {
            status: "comparable", title: "No net gap in the shared period",
            explanation: "The totals are equal over the shared dates, and the declared settings match. Individual dates can still differ.",
            nextStep: "Inspect the daily rows if timing differences matter. The current totals do not indicate a count discrepancy.",
            evidence, range: overlap, totals, alignedRows,
        };
    return {
        status: "comparable", title: "No declared settings mismatch", explanation: `The reports use the same mapped event, shared dates, reporting basis, and attribution. The aligned totals differ by ${absoluteDifference.toLocaleString()} (${gapPercent.toFixed(1)}% of the larger total).`, nextStep: "Verify event collection and duplicate/counting behavior in the source systems. If the counts still differ, inspect the event records over this same date window.", evidence, range: overlap, totals, alignedRows,
    };
}
