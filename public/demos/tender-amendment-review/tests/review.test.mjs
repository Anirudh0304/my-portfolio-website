import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { DEFAULT_RULES, meaningfulChanges, reviewBrief, statusFor } from "../app.js";

const data = JSON.parse(readFileSync(new URL("../data.json", import.meta.url)));
const britishCouncil = data.cases["ocds-h6vhtk-05e1c5"];
const printFulfilment = data.cases["ocds-h6vhtk-0514cc"];
const comparison = (item, updated) => {
  const diff = item.structured_diffs.find((pair) => pair.to_release === updated);
  assert.ok(diff, updated);
  return diff;
};

test("value correction and deadline extension affect different approvals", () => {
  const value = comparison(britishCouncil, "019127-2026");
  assert.equal(meaningfulChanges(value).find(({ field }) => field === "value.amount").after, 45_000_000);
  assert.ok(!meaningfulChanges(value).some(({ field }) => field === "documents"));
  assert.equal(statusFor(DEFAULT_RULES[0], value).label, "Reopen");
  assert.notEqual(statusFor(DEFAULT_RULES[1], value).label, "Reopen");

  const deadline = comparison(britishCouncil, "026924-2026");
  assert.equal(
    Date.parse(meaningfulChanges(deadline).find(({ field }) => field === "expressionOfInterestDeadline").after),
    Date.parse("2026-03-31T10:00:00Z"),
  );
  assert.equal(statusFor(DEFAULT_RULES[1], deadline).label, "Reopen");
});

test("a changed buyer portal remains in the ledger even when the notice link is filtered", () => {
  const from = "https://www.find-tender.service.gov.uk/Notice/019117-2026";
  const to = "https://www.find-tender.service.gov.uk/Notice/019127-2026";
  const diff = { from_url: from, to_url: to, changes: [{
    field: "documents",
    before: [["tenderNotice", null, from], ["biddingDocuments", null, "https://example.org/old"]],
    after: [["tenderNotice", null, to], ["biddingDocuments", null, "https://example.org/new"]],
  }] };
  const [change] = meaningfulChanges(diff);
  assert.deepEqual(change.after, [["biddingDocuments", null, "https://example.org/new"]]);
  assert.equal(statusFor(DEFAULT_RULES[1], diff).label, "Cannot assess");
});

test("equivalent timestamps do not reopen approval and a prose-only update needs review", () => {
  const equivalent = { changes: [{
    field: "tenderPeriod.endDate",
    before: "2025-12-12T11:59:00Z",
    after: "2025-12-12T11:59:00+00:00",
  }] };
  assert.deepEqual(meaningfulChanges(equivalent), []);
  assert.equal(statusFor(DEFAULT_RULES[1], equivalent).label, "Still current");

  const outcome = comparison(printFulfilment, "073288-2025");
  assert.ok(meaningfulChanges(comparison(printFulfilment, "073286-2025"))
    .some(({ field }) => field === "tenderPeriod.endDate"));
  assert.ok(!meaningfulChanges(outcome).some(({ field }) => field === "tenderPeriod.endDate"));
  assert.equal(statusFor(DEFAULT_RULES[1], outcome).label, "Cannot assess");
});

test("review brief carries the compared notices, current rules, notes and evidence limits", () => {
  const diff = comparison(britishCouncil, "026924-2026");
  const note = "Confirm the submission owner.";
  const brief = reviewBrief({ item: britishCouncil, diff, rules: DEFAULT_RULES, note, capturedAt: data.captured_at_utc });
  for (const part of [diff.from_url, diff.to_url, note, data.captured_at_utc,
    "Submission plan: Reopen", "Buyer pack: not verified", "Open Government Licence v3.0"]) {
    assert.ok(brief.includes(part), part);
  }
  assert.ok(brief.split("\n").length > 10);
});
