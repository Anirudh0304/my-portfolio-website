import test from 'node:test';
import assert from 'node:assert/strict';
import { runPreflight, parseNegatives } from '../dist/matcher.js';

test('exact blocks only the identical query', () => {
  const result = runPreflight('project management software\nfree project management software', '[project management software]');
  assert.equal(result.queries[0].status, 'warning');
  assert.equal(result.queries[1].status, 'clear');
  assert.match(result.queries[0].blocks[0].explanation, /Exact/u);
});

test('phrase blocks an ordered phrase with surrounding words, not reversed words', () => {
  const result = runPreflight('best free trial project management\ntrial free project management', '"free trial"');
  assert.equal(result.queries[0].status, 'warning');
  assert.equal(result.queries[1].status, 'clear');
});

test('broad blocks when every term appears in any order', () => {
  const result = runPreflight('shoes running sale\nrunning boot sale', 'running shoes');
  assert.equal(result.queries[0].status, 'warning');
  assert.equal(result.queries[1].status, 'clear');
});

test('case and periods are normalized while singular/plural is not expanded', () => {
  const result = runPreflight('FIFTH Ave. hotels\nFifth Aves hotels', 'fifth ave');
  assert.equal(result.queries[0].status, 'warning');
  assert.equal(result.queries[1].status, 'clear');
});

test('must-keep conflicts become a launch-review blocker; ordinary conflicts stay warnings', () => {
  const result = runPreflight('! free project management software\nfree project management software', 'free');
  assert.equal(result.queries[0].status, 'launch-review');
  assert.equal(result.queries[1].status, 'warning');
});

test('unbalanced and mixed match markers are malformed and never guessed', () => {
  const negatives = parseNegatives('"free trial\n[free trial"\n[]');
  assert.deepEqual(negatives.map((item) => item.issue?.kind), ['malformed', 'malformed', 'malformed']);
});

test('comma-separated and operator-prefixed lines are ambiguous', () => {
  const negatives = parseNegatives('free, trial\n-free');
  assert.deepEqual(negatives.map((item) => item.issue?.kind), ['ambiguous', 'ambiguous']);
});

test('unreviewable negative syntax places nonmatching queries in needs-review state', () => {
  const result = runPreflight('free software\nproject management', '"free trial');
  assert.deepEqual(result.queries.map((item) => item.status), ['needs-review', 'needs-review']);
  assert.equal(result.summary.needsReview, 1);
});

test('rules after the sixteenth query word are not treated as a block', () => {
  const prefix = 'one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen';
  const result = runPreflight(`${prefix} sixteen discount\n${prefix} discount`, 'discount');
  assert.equal(result.queries[0].status, 'clear');
  assert.equal(result.queries[1].status, 'warning');
});
