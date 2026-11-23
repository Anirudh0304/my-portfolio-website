const makeRows = (event, start, values) => values.map((conversions, index) => {
    const date = new Date(`${start}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + index);
    return { date: date.toISOString().slice(0, 10), event, conversions };
});
const report = (name, rows, basis, attribution, freshnessHours) => ({ name, rows, basis, attribution, freshnessHours });
export const fixtures = [
    {
        id: "aligned",
        label: "Comparable reports · small remaining gap",
        mappedEvent: "Completed purchase",
        eventA: "purchase",
        eventB: "order_complete",
        reportA: report("Analytics export", makeRows("purchase", "2026-10-01", [18, 17, 21]), "event_time", "data_driven", 74),
        reportB: report("Ads conversion export", makeRows("order_complete", "2026-10-01", [18, 18, 19]), "event_time", "data_driven", 76),
    },
    {
        id: "settings",
        label: "Known settings mismatch · conversion timing",
        mappedEvent: "Completed purchase",
        eventA: "purchase",
        eventB: "purchase_primary",
        reportA: report("Analytics export", makeRows("purchase", "2026-10-01", [35, 32, 33]), "event_time", "data_driven", 72),
        reportB: report("Ads conversion export", makeRows("purchase_primary", "2026-10-01", [28, 31, 27]), "interaction_time", "data_driven", 70),
    },
    {
        id: "missing-day",
        label: "Incomplete export · missing day",
        mappedEvent: "Completed purchase",
        eventA: "purchase",
        eventB: "order_complete",
        reportA: report("Analytics export", makeRows("purchase", "2026-10-01", [18, 0, 21]), "event_time", "data_driven", 74),
        reportB: report("Ads conversion export", makeRows("order_complete", "2026-10-01", [18, 0, 19]).filter((_, index) => index !== 1), "event_time", "data_driven", 76),
    },
    {
        id: "unresolved",
        label: "Unresolved · event mapping missing",
        mappedEvent: "",
        eventA: "demo_request",
        eventB: "lead_submit",
        reportA: report("Analytics export", makeRows("demo_request", "2026-10-01", [31, 24, 29]), "event_time", "data_driven", 83),
        reportB: report("CRM conversion export", makeRows("lead_submit", "2026-10-01", [24, 29, 23]), undefined, undefined, undefined),
    },
];
