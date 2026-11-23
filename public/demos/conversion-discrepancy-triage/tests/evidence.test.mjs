import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { assess, parseCsv } from "../dist/triage.js";
import { fixtures } from "../dist/fixtures.js";

const comparable = fixtures[0];
const run = (reportA, reportB, extra = {}) => assess({
  reportA, reportB, eventA: comparable.eventA, eventB: comparable.eventB,
  mappedEvent: comparable.mappedEvent, ...extra,
});
const a = comparable.reportA;
const b = comparable.reportB;

test("equal nonzero totals do not trigger a discrepancy investigation", () => {
  const reportB = { ...b, rows: a.rows.map((row) => ({ ...row, event: comparable.eventB })) };
  const result = run(a, reportB);
  assert.equal(result.totals.absoluteDifference, 0);
  assert.match(result.title, /No net gap/);
});

test("upload examples / checked-in report pair reproduces the result and refusal", () => {
  const read = (name, settings) => ({
    ...settings,
    ...parseCsv(readFileSync(new URL("../samples/" + name, import.meta.url), "utf8"), name),
  });
  const full = run(read("report-a.csv", a), read("report-b.csv", b));
  assert.equal(full.totals.a, 56);
  assert.equal(full.totals.b, 55);
  const incomplete = run(read("report-a.csv", a), read("report-b-missing-day.csv", b));
  assert.equal(incomplete.status, "insufficient");
  assert.equal(incomplete.totals, undefined);
});

test("coverage / missing row does not become zero", () => {
  const fixture = fixtures.find(({ id }) => id === "missing-day");
  const result = run(fixture.reportA, fixture.reportB);
  assert.equal(result.status, "insufficient");
  assert.equal(result.totals, undefined);
  assert.equal(result.evidence.find(({ label }) => label === "Daily coverage").value, "A: 3/3 days · B: 2/3 days");
});
test("coverage / observed zero is comparable to a nonzero day", () => {
  const reportB = { ...b, rows: b.rows.map((row, i) => i === 1 ? { ...row, conversions: 0 } : row) };
  const result = run(a, reportB);
  assert.equal(result.status, "comparable");
  assert.equal(result.alignedRows[1].b, 0);
  assert.equal(result.totals.b, 37);
});
test("coverage / another event cannot create a shared date range", () => {
  const reportB = { ...b, rows: [...b.rows, { date: "2026-10-04", event: "unrelated", conversions: 8 }] };
  const result = run(a, reportB);
  assert.equal(result.range.end, "2026-10-03");
  assert.equal(result.totals.b, 55);
});
test("coverage / partial overlap excludes the out-of-range day", () => {
  const result = run(a, { ...b, rows: b.rows.slice(1) });
  assert.deepEqual(result.range, { start: "2026-10-02", end: "2026-10-03" });
  assert.equal(result.totals.a, 38);
  assert.equal(result.totals.b, 37);
});
test("coverage / a nonexistent event does not count as a report of zero", () => {
  assert.equal(run(a, b, { eventB: "unavailable" }).status, "insufficient");
});
test("coverage / segmented source rows sum on the same day", () => {
  const result = run(a, { ...b, rows: [...b.rows, { ...b.rows[1], conversions: 3.5 }] });
  assert.equal(result.alignedRows[1].b, 21.5);
  assert.equal(result.totals.b, 58.5);
});
for (const [label, value] of [["negative", -1], ["not finite", Infinity], ["not a number", NaN], ["missing", undefined]]) {
  test("metadata / rejects " + label + " freshness", () => {
    assert.equal(run(a, { ...b, freshnessHours: value }).status, "insufficient");
  });
}
test("metadata / 48 hours is the chosen boundary", () => {
  assert.equal(run(a, { ...b, freshnessHours: 47 }).status, "provisional");
  assert.equal(run(a, { ...b, freshnessHours: 48 }).status, "comparable");
});
const header = "date,event,conversions\n";
const invalidCsv = [
  ["duplicate header", "date,event,conversions,conversions\n2026-10-01,purchase,1,2", /unique/],
  ["extra cells", header + "2026-10-01,purchase,1,2", /column count/],
  ["hexadecimal count", header + "2026-10-01,purchase,0x10", /decimal/],
  ["unclosed quote", header + '2026-10-01,"purchase,1', /not closed/],
  ["trailing characters after quote", header + '2026-10-01,"purchase"x,1', /quoted CSV/],
  ["quote inside unquoted field", header + '2026-10-01,purch"ase,1', /quoted CSV/],
  ["unsafe integer", header + "2026-10-01,purchase,9007199254740992", /decimal/],
];
for (const [label, input, expected] of invalidCsv) {
  test("CSV / rejects " + label, () => assert.throws(() => parseCsv(input, "test.csv"), expected));
}
test("CSV / accepts BOM, CRLF, escaped quotes and fractional counts", () => {
  const report = parseCsv('\ufeffdate,event,conversions\r\n2026-10-01,"a ""quoted"", event",1.25', "test.csv");
  assert.deepEqual(report.rows, [{ date: "2026-10-01", event: 'a "quoted", event', conversions: 1.25 }]);
});
