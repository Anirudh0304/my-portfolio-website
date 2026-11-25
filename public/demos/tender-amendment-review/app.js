const DATA_URL = "data.json";
export const DEFAULT_RULES = [
  { id: "bid-decision", name: "Go / no-go review", fields: ["value.amount", "expressionOfInterestDeadline", "tenderPeriod.endDate", "selectionCriteria"] },
  { id: "submission-plan", name: "Submission plan", fields: ["tenderPeriod.endDate", "expressionOfInterestDeadline", "enquiryPeriod.endDate"] },
  { id: "delivery-fit", name: "Delivery readiness", fields: ["contractPeriod", "selectionCriteria"] }
];
const LABELS = {
  "value.amount": "Estimated value",
  "expressionOfInterestDeadline": "Expression of interest deadline",
  "tenderPeriod.endDate": "Submission deadline",
  "enquiryPeriod.endDate": "Enquiry deadline",
  "awardPeriod.endDate": "Outcome notification date",
  "contractPeriod": "Contract period",
  "selectionCriteria": "Selection criteria",
  "documents": "Document references",
  "amendments": "Amendment note"
};
const state = { data: null, caseId: null, diffIndex: 0, rules: structuredClone(DEFAULT_RULES) };
const $ = (selector) => document.querySelector(selector);
const notes = new Map();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function londonTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "London time unavailable";
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(date);
}
function formatValue(field, value) {
  if (value === null || value === undefined) return "Not stated";
  if (field === "value.amount" && typeof value === "number") return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 }).format(value);
  if (typeof value === "string" && /^\d{4}-\d\d-\d\dT/.test(value)) return `<span class="value-block">${escapeHtml(value)}</span><span class="sub-value">${escapeHtml(londonTime(value))} (Europe/London)</span>`;
  if (field === "contractPeriod" && typeof value === "object") return Object.entries(value).map(([key, date]) => `<div class="value-block">${escapeHtml(key)}: ${formatValue("date", date)}</div>`).join("");
  if (field === "selectionCriteria" && typeof value === "object") return escapeHtml(value.criteria?.map((item) => item.description).join("; ") || JSON.stringify(value));
  if (field === "documents" && Array.isArray(value)) {
    return value.map(([kind, label, url]) => {
      const name = label || (kind === "biddingDocuments" ? "Bidding documents" : kind);
      return `<span class="value-block">${escapeHtml(name)}</span><span class="sub-value">${escapeHtml(url || "No public URL listed")}</span>`;
    }).join("") || "No references listed";
  }
  if (field === "amendments" && Array.isArray(value)) {
    return escapeHtml(value.map((entry) => entry[1]).filter(Boolean).join(" ") || "No note recorded");
  }
  if (Array.isArray(value)) return `<span class="sub-value">${value.length} listed item${value.length === 1 ? "" : "s"}</span>`;
  return escapeHtml(typeof value === "object" ? JSON.stringify(value) : value);
}
function releaseById(caseData, id) { return caseData.releases.find((release) => release.release_id === id); }
function canonicalValue(value) {
  if (typeof value === "string" && /^\d{4}-\d\d-\d\dT.*(?:Z|[+-]\d\d:\d\d)$/.test(value)) {
    const instant = Date.parse(value);
    if (!Number.isNaN(instant)) return { timestamp: instant };
  }
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, canonicalValue(value[key])]));
  return value;
}
export function meaningfulChanges(diff) {
  const omitNoticeLink = (value, noticeUrl) =>
    Array.isArray(value) ? value.filter(([kind, , url]) => kind !== "tenderNotice" || url !== noticeUrl) : value;
  return (diff.changes || [])
    .map((change) => change.field === "documents" ? {
      ...change,
      before: omitNoticeLink(change.before, diff.from_url),
      after: omitNoticeLink(change.after, diff.to_url),
    } : change)
    .filter((change) => JSON.stringify(canonicalValue(change.before)) !== JSON.stringify(canonicalValue(change.after)));
}
function populateCases() {
  const select = $("#case-select");
  select.innerHTML = Object.entries(state.data.cases).map(([id, item]) => `<option value="${escapeHtml(id)}">${escapeHtml(item.title)}</option>`).join("");
  select.value = state.caseId || select.options[0]?.value;
  state.caseId = select.value;
  populateTransitions();
}
function populateTransitions() {
  const item = state.data.cases[state.caseId];
  const select = $("#transition-select");
  select.innerHTML = item.structured_diffs.map((diff, index) => `<option value="${index}">${escapeHtml(diff.from_release)} → ${escapeHtml(diff.to_release)}</option>`).join("");
  state.diffIndex = Math.min(state.diffIndex, Math.max(item.structured_diffs.length - 1, 0));
  select.value = String(state.diffIndex);
  render();
}
function renderReleases(item, diff) {
  const prev = releaseById(item, diff.from_release);
  const next = releaseById(item, diff.to_release);
  const previousLink = $("#previous-link");
  previousLink.href = diff.from_url;
  previousLink.textContent = diff.from_release;
  const previousRaw = prev?.published_at || "";
  $("#previous-time").dateTime = previousRaw;
  $("#previous-time").textContent = `Published ${previousRaw} · ${londonTime(previousRaw)} (Europe/London)`;
  const updatedLink = $("#updated-link");
  updatedLink.href = diff.to_url;
  updatedLink.textContent = diff.to_release;
  const rawTime = diff.published_at || next?.published_at || "";
  $("#updated-time").dateTime = rawTime;
  $("#updated-time").textContent = `Published ${rawTime} · ${londonTime(rawTime)} (Europe/London)`;
}
function amendmentText(item, diff) {
  const release = releaseById(item, diff.to_release);
  return (release?.amendments || []).map((entry) => Array.isArray(entry) ? entry[1] : entry.description || "").filter(Boolean).join("\n") || "No amendment text recorded in this release.";
}
function renderChanges(item, diff) {
  const body = $("#changes-body");
  const changes = meaningfulChanges(diff);
  $("#change-summary").textContent = `${changes.length} recorded field${changes.length === 1 ? "" : "s"} changed in this release pair.`;
  $("#empty-ledger").hidden = changes.length > 0;
  body.innerHTML = changes.map((change) => {
    const field = change.field;
    let signal;
    if (field === "documents") signal = `<span class="signal assess">Pack not verified</span>`;
    else if (field === "amendments") signal = `<span class="signal assess">Read notice text</span>`;
    else signal = `<span class="signal reopen">Structured change</span>`;
    return `<tr><td>${escapeHtml(LABELS[field] || field)}<span class="sub-value">${escapeHtml(field)}</span></td><td>${formatValue(field, change.before)}</td><td>${formatValue(field, change.after)}</td><td>${signal}</td></tr>`;
  }).join("");
  const note = $("#amendment-note");
  note.hidden = changes.some(({ field }) => field === "amendments");
  note.innerHTML = `<strong>Updated notice text · ${escapeHtml(diff.to_release)}</strong>${escapeHtml(amendmentText(item, diff))}`;
  const listed = releaseById(item, diff.to_release)?.documents?.find((doc) => Array.isArray(doc) && doc[0] === "biddingDocuments" && doc[2]);
  const packLink = $("#pack-link");
  packLink.hidden = !listed;
  if (listed) packLink.href = listed[2];
}
export function statusFor(rule, diff) {
  const changes = meaningfulChanges(diff);
  const relevant = changes.filter((change) => rule.fields.includes(change.field) && !["documents", "amendments"].includes(change.field));
  const uncertain = changes.some((change) => ["documents", "amendments"].includes(change.field));
  if (relevant.length) return { type: "reopen", label: "Reopen", reason: `Changed: ${relevant.map((change) => LABELS[change.field] || change.field).join(", ")}.` };
  if (uncertain) return { type: "assess", label: "Cannot assess", reason: "No mapped field changed; notice text or pack changes need a human check." };
  return { type: "current", label: "Still current", reason: "No declared dependency changed." };
}
function renderApprovals(diff) {
  const body = $("#approvals-body");
  body.innerHTML = state.rules.map((rule) => {
    const status = statusFor(rule, diff);
    const options = Object.keys(LABELS).filter((field) => !["documents", "amendments", "awardPeriod.endDate"].includes(field));
    const toggles = options.map((field) => `<label class="rule-toggle"><input type="checkbox" data-rule="${escapeHtml(rule.id)}" value="${escapeHtml(field)}" ${rule.fields.includes(field) ? "checked" : ""}><span>${escapeHtml(LABELS[field])}</span></label>`).join("");
    return `<tr><td>${escapeHtml(rule.name)}<span class="sub-value">Illustrative only</span></td><td><div class="rule-set">${toggles}</div></td><td><span class="approval-status ${status.type}">${status.label}</span><span class="status-reason">${escapeHtml(status.reason)}</span></td></tr>`;
  }).join("");
  body.querySelectorAll("input[type=checkbox]").forEach((input) => input.addEventListener("change", () => {
    const rule = state.rules.find((item) => item.id === input.dataset.rule);
    rule.fields = [...new Set([...rule.fields.filter((field) => field !== input.value), ...(input.checked ? [input.value] : [])])];
    const row = input.closest("tr");
    const status = statusFor(rule, diff);
    const badge = row.querySelector(".approval-status");
    badge.className = "approval-status " + status.type;
    badge.textContent = status.label;
    row.querySelector(".status-reason").textContent = status.reason;
  }));
  body.querySelectorAll("td:last-child").forEach((cell) => {
    cell.setAttribute("aria-live", "polite");
    cell.setAttribute("aria-atomic", "true");
  });
}
function activeComparison() {
  const item = state.data.cases[state.caseId];
  return { item, diff: item?.structured_diffs[state.diffIndex] };
}
function render() {
  const { item, diff } = activeComparison();
  if (!diff) return;
  renderReleases(item, diff);
  renderChanges(item, diff);
  renderApprovals(diff);
  $("#review-notes").value = notes.get(diff.to_release) || "";
}

export function reviewBrief({ item, diff, rules, note, capturedAt }) {
  const printable = (value) => value == null ? "Not stated" : typeof value === "string" ? value : JSON.stringify(value);
  return [
    "Tender Amendment Review — illustrative review brief",
    item.title,
    "Evidence captured: " + capturedAt,
    "Previous notice: " + diff.from_url,
    "Updated notice: " + diff.to_url,
    "",
    "Notice changes",
    ...meaningfulChanges(diff).map(({ field, before, after }) =>
      "- " + (LABELS[field] || field) + ": " + printable(before) + " → " + printable(after)),
    "",
    "Updated notice text",
    amendmentText(item, diff),
    "",
    "Approval impact under sample rules",
    ...rules.map((rule) => {
      const { label, reason } = statusFor(rule, diff);
      const dependencies = rule.fields.map((field) => LABELS[field]).join(", ") || "none";
      return "- " + rule.name + ": " + label + ". " + reason + " Dependencies: " + dependencies + ".";
    }),
    "",
    "Buyer pack: not verified.",
    "Reviewer notes",
    note.trim() || "No reviewer notes recorded.",
    "",
    "Source: Cabinet Office Find a Tender data, Open Government Licence v3.0.",
    "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
  ].join("\n");
}

function downloadBrief() {
  const { item, diff } = activeComparison();
  const text = reviewBrief({
    item, diff, rules: state.rules, note: $("#review-notes").value,
    capturedAt: state.data.captured_at_utc,
  });
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "tender-review-" + diff.to_release + ".txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function start() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Could not load local evidence data (${response.status}).`);
    state.data = await response.json();
    const cases = Object.values(state.data.cases ?? {});
    if (!cases.length || cases.some((item) => !item.structured_diffs?.length)) {
      throw new Error("No comparable release pairs are available.");
    }
    $("#capture-date").textContent = `Evidence captured ${new Date(state.data.captured_at_utc).toLocaleDateString("en-GB", { dateStyle: "medium", timeZone: "UTC" })} UTC`;
    populateCases();
    $("#case-select").addEventListener("change", (event) => { state.caseId = event.target.value; state.diffIndex = 0; populateTransitions(); });
    $("#transition-select").addEventListener("change", (event) => { state.diffIndex = Number(event.target.value); render(); });
    $("#reset-rules").addEventListener("click", () => { state.rules = structuredClone(DEFAULT_RULES); render(); });
    $("#review-notes").addEventListener("input", (event) => {
      notes.set(activeComparison().diff.to_release, event.target.value);
    });
    $("#download-brief").addEventListener("click", downloadBrief);
    $("#review-controls").disabled = false;
  } catch (error) {
    const main = $("main");
    const banner = document.createElement("p");
    banner.className = "error-banner";
    banner.setAttribute("role", "alert");
    banner.textContent = error.message + " Reload this page to try again.";
    main.prepend(banner);
  }
}
if (typeof document !== "undefined") start();
