import test from "node:test";
import assert from "node:assert/strict";
import { comparePreflight, runPreflight } from "../dist/matcher.js";

const length16 = "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen";
const ruleCases = [
  ["broad ignores order", "shoes for running", "running shoes", "warning"],
  ["broad requires all terms", "running socks", "running shoes", "clear"],
  ["phrase allows surrounding words", "best free trial today", '"free trial"', "warning"],
  ["phrase requires adjacency", "free software trial", '"free trial"', "clear"],
  ["phrase requires order", "trial free", '"free trial"', "clear"],
  ["exact accepts case normalization", "FREE trial", "[free trial]", "warning"],
  ["exact rejects extra word", "free trial today", "[free trial]", "clear"],
  ["exact rejects extra word after token 16", length16 + " extra", "[" + length16 + "]", "clear"],
  ["broad does not expand plurals", "red flower", "flowers", "clear"],
  ["unsupported search punctuation is uncertain", "c++ bootcamp", "bootcamp", "needs-review"],
  ["unsupported negative punctuation is uncertain", "c plus plus", "c++", "needs-review"],
  ["empty after normalization is uncertain", "free", ".", "needs-review"],
  ["accented term is literal", "café beans", "cafe", "clear"],
  ["supported multilingual literal survives", "無料 ソフト", "無料", "warning"],
  ["unbalanced match marker is uncertain", "free trial", '"free trial', "needs-review"],
  ["must-keep conflict escalates", "! buy free tier software", "free", "launch-review"],
];
for (const [name, query, negative, expected] of ruleCases) {
  test("rule / " + name, () => assert.equal(runPreflight(query, negative).queries[0].status, expected));
}

const changeCases = [
  ["new conflict", "! free project software", '"free trial"', 'free\n"free trial"', "new-conflict"],
  ["prior conflict", "best free trial", '"free trial"', 'free\n"free trial"', "existing-conflict"],
  ["query recovered", "free project software", "free", '"free trial"', "restored"],
  ["unaffected", "paid project software", "free", '"free trial"', "unchanged"],
  ["bad baseline cannot prove new conflict", "free project software", '"wrong', "free", "uncertain"],
  ["bad candidate cannot prove recovery", "free project software", "free", '"wrong', "uncertain"],
];
for (const [name, query, current, proposed, expected] of changeCases) {
  test("change / " + name, () => assert.equal(comparePreflight(query, current, proposed).queries[0].change, expected));
}
