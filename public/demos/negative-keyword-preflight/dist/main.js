import { comparePreflight, runPreflight } from "./matcher.js";
const seedQueries = [
    "! free project management software",
    "free project management software for small teams",
    "best free trial project management tool",
    "project management software for teams",
].join("\n");
const seedNegatives = [
    "free",
    '"free trial"',
    "[free project management software]",
].join("\n");
const $ = (selector) => {
    const element = document.querySelector(selector);
    if (!element)
        throw new Error(`Missing required element: ${selector}`);
    return element;
};
const escapeHtml = (value) => value.replace(/[&<>"']/gu, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character] ?? character));
const typeLabel = (type) => `${type} match`;
const negativeDisplay = (block) => {
    if (block.negative.type === "phrase")
        return `“${block.negative.text}”`;
    if (block.negative.type === "exact")
        return `[${block.negative.text}]`;
    return block.negative.text;
};
function statusMarkup(result) {
    const copy = {
        clear: ["clear", "No direct match in the supplied rules."],
        warning: ["warning", "Review this conflict before launch."],
        "launch-review": ["blocker", "Must-keep query blocked · resolve before approval."],
        "needs-review": ["needs-review", "Review input · result may be incomplete."],
    };
    const [className, label] = copy[result.status];
    return `<span class="status status-${className}">${label}</span>`;
}
function renderIssues(negatives) {
    const issues = negatives.filter((item) => item.issue);
    const region = $("#input-issues");
    region.hidden = issues.length === 0;
    region.innerHTML = issues.map(({ line, original, issue }) => `<p><strong>Negative line ${line} needs review:</strong> ${escapeHtml(original)} — ${escapeHtml(issue?.message ?? "")}</p>`).join("");
}
function renderRows(results) {
    const body = $("#result-rows");
    const empty = $("#empty-state");
    empty.hidden = results.length > 0;
    body.innerHTML = results.map((result) => {
        const changes = {
            "new-conflict": "New conflict",
            "existing-conflict": "Conflict already present",
            restored: "No match after the change",
            unchanged: "No change",
            uncertain: "Change unclear",
        };
        const change = result.change ? `<p class="field-help">${changes[result.change]}</p>` : "";
        const query = `${result.query.mustKeep ? '<span class="keep-mark">Must keep</span>' : ""}<span>${escapeHtml(result.query.text)}</span>`;
        const matches = result.blocks.length
            ? result.blocks.map((block) => `<li><strong>${escapeHtml(negativeDisplay(block))}</strong><span class="match-type">${typeLabel(block.negative.type)}</span></li>`).join("")
            : `<li class="no-match">${result.status === "clear" ? "No direct text match in the supplied rules." : "No definite match found."}</li>`;
        const explanations = result.blocks.length
            ? result.blocks.map((block) => `<li>${escapeHtml(block.explanation)}</li>`).join("")
            : `<li>${result.status === "clear" ? "No direct text match in the supplied rules." : escapeHtml(result.issue ?? "Resolve the input note above before relying on this result.")}</li>`;
        return `<tr class="result-row result-${result.status}"><th scope="row" data-label="Intended query">${query}</th><td data-label="Review status">${statusMarkup(result)}${change}</td><td data-label="Matching negative"><ul class="match-list">${matches}</ul></td><td data-label="Why it matches"><ul class="explanation-list">${explanations}</ul></td></tr>`;
    }).join("");
}
function update() {
    const result = comparisonEnabled.checked
        ? comparePreflight(queryInput.value, currentInput.value, negativeInput.value)
        : runPreflight(queryInput.value, negativeInput.value);
    const { summary, queries, negatives } = result;
    const newConflicts = queries.filter(({ change }) => change === "new-conflict").length;
    $("#result-summary").textContent = `${summary.blocked} queries flagged · ${summary.protected} must-keep · ${summary.needsReview} negative lines need review${comparisonEnabled.checked ? ` · ${newConflicts} new conflicts` : ""}`;
    renderIssues(negatives);
    if (comparisonEnabled.checked) {
        const invalid = runPreflight("", currentInput.value).negatives.filter(({ issue }) => issue).length;
        if (invalid) {
            const region = $("#input-issues");
            region.hidden = false;
            const note = document.createElement("p");
            note.textContent = `${invalid} current-list lines need review. Affected changes may be uncertain.`;
            region.append(note);
        }
    }
    renderRows(queries);
}
const queryInput = $("#query-input");
const negativeInput = $("#negative-input");
const currentInput = $("#current-input");
const comparisonEnabled = $("#compare-enabled");
function toggleComparison() {
    $("#compare-input").hidden = !comparisonEnabled.checked;
    update();
}
queryInput.value = seedQueries;
negativeInput.value = seedNegatives;
queryInput.addEventListener("input", update);
negativeInput.addEventListener("input", update);
currentInput.addEventListener("input", update);
comparisonEnabled.addEventListener("change", toggleComparison);
$("#seed-button").addEventListener("click", () => {
    queryInput.value = seedQueries;
    negativeInput.value = seedNegatives;
    currentInput.value = '"free trial"';
    comparisonEnabled.checked = true;
    toggleComparison();
});
currentInput.value = '"free trial"';
toggleComparison();
