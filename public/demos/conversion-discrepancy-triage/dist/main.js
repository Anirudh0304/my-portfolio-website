import { fixtures } from "./fixtures.js";
import { assess, parseCsv } from "./triage.js";
const $ = (selector) => {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Missing required element: ${selector}`);
    return element;
};
const esc = (value) => value.replace(/[&<>"']/gu, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character] ?? character));
let activeFixture = fixtures[0];
let reportA = activeFixture.reportA;
let reportB = activeFixture.reportB;
const uploadVersion = { a: 0, b: 0 };
function populateEvents(selector, report, selected) {
    const select = $(selector);
    const events = [...new Set(report.rows.map((row) => row.event))].sort();
    select.replaceChildren(...events.map((event) => new Option(event, event)));
    if (events.includes(selected))
        select.value = selected;
}
function reportValues(side) {
    const report = side === "a" ? reportA : reportB;
    const basis = $(`#basis-${side}`);
    const attribution = $(`#attribution-${side}`);
    const freshness = $(`#freshness-${side}`);
    const enteredFreshness = freshness.value.trim() === "" ? undefined : Number(freshness.value);
    const freshnessHours = enteredFreshness !== undefined && enteredFreshness >= 0 ? enteredFreshness : undefined;
    return {
        ...report,
        basis: (basis.value || undefined),
        attribution: (attribution.value || undefined),
        freshnessHours: freshnessHours !== undefined && Number.isFinite(freshnessHours) ? freshnessHours : undefined,
    };
}
function render() {
    const input = {
        reportA: reportValues("a"), reportB: reportValues("b"),
        eventA: $("#event-a").value,
        eventB: $("#event-b").value,
        mappedEvent: $("#mapped-event").value,
    };
    const result = assess(input);
    const badge = $("#assessment-badge");
    badge.className = `assessment-badge badge-${result.status}`;
    badge.textContent = result.status.replaceAll("-", " ");
    $("#assessment-title-copy").textContent = result.title;
    $("#assessment-explanation").textContent = result.explanation;
    $("#next-step").textContent = result.nextStep;
    $("#evidence-list").innerHTML = result.evidence.map((item) => `<div class="evidence-row"><dt>${esc(item.label)}</dt><dd><span class="evidence-state state-${item.state}">${item.state === "aligned" ? "Aligned" : item.state === "different" ? "Check" : "Unknown"}</span>${esc(item.value)}</dd></div>`).join("");
    const values = $("#comparison-values");
    values.hidden = !result.totals || !result.range;
    if (!result.totals || !result.range)
        return;
    $("#aligned-range").textContent = `Shared period: ${result.range.start} – ${result.range.end} · ${input.mappedEvent.trim()}`;
    $("#gap-percent").textContent = `${result.totals.gapPercent.toFixed(1)}%`;
    $("#column-a").textContent = `${reportA.name} · ${input.eventA}`;
    $("#column-b").textContent = `${reportB.name} · ${input.eventB}`;
    $("#aligned-rows").innerHTML = (result.alignedRows ?? []).map((row) => `<tr><th scope="row" data-label="Date">${esc(row.date)}</th><td data-label="${esc(reportA.name)}">${row.a.toLocaleString()}</td><td data-label="${esc(reportB.name)}">${row.b.toLocaleString()}</td><td data-label="Daily difference">${Math.abs(row.a - row.b).toLocaleString()}</td></tr>`).join("");
    $("#aligned-totals").innerHTML = `<tr><th scope="row" data-label="Summary">Total</th><td data-label="${esc(reportA.name)}">${result.totals.a.toLocaleString()}</td><td data-label="${esc(reportB.name)}">${result.totals.b.toLocaleString()}</td><td data-label="Difference">${result.totals.absoluteDifference.toLocaleString()}</td></tr>`;
}
function loadFixture(fixture) {
    uploadVersion.a += 1;
    uploadVersion.b += 1;
    activeFixture = fixture;
    reportA = structuredClone(fixture.reportA);
    reportB = structuredClone(fixture.reportB);
    $("#report-a-name").textContent = reportA.name;
    $("#report-b-name").textContent = reportB.name;
    $("#mapped-event").value = fixture.mappedEvent;
    populateEvents("#event-a", reportA, fixture.eventA);
    populateEvents("#event-b", reportB, fixture.eventB);
    for (const side of ["a", "b"]) {
        const report = side === "a" ? reportA : reportB;
        $(`#basis-${side}`).value = report.basis ?? "";
        $(`#attribution-${side}`).value = report.attribution ?? "";
        $(`#freshness-${side}`).value = report.freshnessHours === undefined ? "" : String(report.freshnessHours);
        $(`#file-${side}`).value = "";
        $(`#file-status-${side}`).textContent = "Sample data loaded.";
    }
    $("#file-error").hidden = true;
    render();
}
const fixtureSelect = $("#fixture-select");
fixtureSelect.replaceChildren(...fixtures.map((fixture) => new Option(fixture.label, fixture.id)));
fixtureSelect.addEventListener("change", () => {
    const fixture = fixtures.find((item) => item.id === fixtureSelect.value);
    if (fixture)
        loadFixture(fixture);
});
for (const side of ["a", "b"]) {
    $(`#file-${side}`).addEventListener("change", async (event) => {
        const file = event.currentTarget.files?.[0];
        if (!file)
            return;
        const version = ++uploadVersion[side];
        try {
            const parsed = parseCsv(await file.text(), file.name);
            if (version !== uploadVersion[side])
                return;
            if (side === "a")
                reportA = parsed;
            else
                reportB = parsed;
            for (const field of ["basis", "attribution", "freshness"]) {
                const control = $(`#${field}-${side}`);
                control.value = "";
            }
            $("#mapped-event").value = "";
            $(`#report-${side}-name`).textContent = file.name;
            populateEvents(`#event-${side}`, parsed, parsed.rows[0].event);
            $(`#file-status-${side}`).textContent = `${parsed.rows.length} rows loaded · ${new Set(parsed.rows.map((row) => row.event)).size} events`;
            $("#file-error").hidden = true;
            fixtureSelect.value = "";
            render();
        }
        catch (error) {
            if (version !== uploadVersion[side])
                return;
            const message = error instanceof Error ? error.message : "The CSV could not be read.";
            $("#file-error").textContent = message;
            $("#file-error").hidden = false;
            $(`#file-status-${side}`).textContent = "CSV not loaded. The previous report is still displayed.";
        }
    });
}
["#mapped-event", "#basis-a", "#basis-b", "#attribution-a", "#attribution-b", "#freshness-a", "#freshness-b"].forEach((selector) => $(selector).addEventListener("input", render));
["#basis-a", "#basis-b", "#attribution-a", "#attribution-b"].forEach((selector) => $(selector).addEventListener("change", render));
for (const selector of ["#event-a", "#event-b"]) {
    $(selector).addEventListener("change", () => {
        $("#mapped-event").value = "";
        render();
    });
}
fixtureSelect.value = activeFixture.id;
loadFixture(activeFixture);
