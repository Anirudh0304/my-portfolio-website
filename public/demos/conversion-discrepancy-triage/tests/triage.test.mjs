import test from 'node:test';
import assert from 'node:assert/strict';
import { assess, parseCsv } from '../dist/triage.js';
import { fixtures } from '../dist/fixtures.js';

const inputFor = (fixture, overrides = {}) => ({
  reportA: fixture.reportA,
  reportB: fixture.reportB,
  eventA: fixture.eventA,
  eventB: fixture.eventB,
  mappedEvent: fixture.mappedEvent,
  ...overrides,
});

test('CSV reader accepts the required columns and aggregates report rows', () => {
  const report = parseCsv('date,event,conversions\n2026-10-01,purchase,3\n2026-10-02,purchase,4', 'sample.csv');
  assert.equal(report.rows.length, 2);
  assert.equal(report.rows[1].conversions, 4);
});

test('CSV reader validates schema, real ISO dates, and non-negative numbers', () => {
  assert.throws(() => parseCsv('day,event,conversions\n2026-10-01,purchase,1', 'bad.csv'), /expected date,event,conversions/u);
  assert.throws(() => parseCsv('date,event,conversions\n2026-02-31,purchase,1', 'bad.csv'), /valid YYYY-MM-DD/u);
  assert.throws(() => parseCsv('date,event,conversions\n2026-10-01,purchase,-1', 'bad.csv'), /non-negative number/u);
});

test('comparable fixture aligns events and dates before calculating the symmetric gap', () => {
  const fixture = fixtures.find((item) => item.id === 'aligned');
  const result = assess(inputFor(fixture));
  assert.equal(result.status, 'comparable');
  assert.deepEqual(result.range, { start: '2026-10-01', end: '2026-10-03' });
  assert.equal(result.totals.a, 56);
  assert.equal(result.totals.b, 55);
  assert.equal(result.totals.absoluteDifference, 1);
  assert.ok(Math.abs(result.totals.gapPercent - (1 / 56 * 100)) < 0.0001);
});

test('known reporting-basis mismatch prompts an alignment check, not a diagnosis', () => {
  const fixture = fixtures.find((item) => item.id === 'settings');
  const result = assess(inputFor(fixture));
  assert.equal(result.status, 'settings-mismatch');
  assert.match(result.explanation, /does not prove the setting caused/u);
  assert.match(result.nextStep, /reporting basis/u);
  assert.equal(result.evidence.find((item) => item.label === 'Reporting basis').state, 'different');
});

test('attribution differences are also called out as declared evidence', () => {
  const fixture = fixtures[0];
  const result = assess(inputFor(fixture, { reportB: { ...fixture.reportB, attribution: 'last_click' } }));
  assert.equal(result.status, 'settings-mismatch');
  assert.match(result.nextStep, /attribution/u);
});

test('a report younger than 48 hours gets a provisional re-export recommendation', () => {
  const fixture = fixtures[0];
  const result = assess(inputFor(fixture, { reportB: { ...fixture.reportB, freshnessHours: 20 } }));
  assert.equal(result.status, 'provisional');
  assert.match(result.nextStep, /export again/u);
});

test('non-overlapping dates produce insufficient evidence', () => {
  const fixture = fixtures[0];
  const reportB = { ...fixture.reportB, rows: fixture.reportB.rows.map((row) => ({ ...row, date: row.date.replace('2026-10-0', '2026-10-1') })) };
  const result = assess(inputFor(fixture, { reportB }));
  assert.equal(result.status, 'insufficient');
  assert.match(result.nextStep, /shared date range/u);
  assert.equal(result.totals, undefined);
});

test('missing event mapping or essential settings withholds a conclusion', () => {
  const fixture = fixtures.find((item) => item.id === 'unresolved');
  const result = assess(inputFor(fixture));
  assert.equal(result.status, 'insufficient');
  assert.match(result.nextStep, /Choose the matching event/u);
  const missingSettings = assess(inputFor(fixtures[0], { reportB: { ...fixtures[0].reportB, attribution: undefined } }));
  assert.equal(missingSettings.status, 'insufficient');
  assert.match(missingSettings.nextStep, /missing settings/u);
});

test('zero conversions on both sides do not imply an aligned diagnosis', () => {
  const fixture = fixtures[0];
  const reportA = { ...fixture.reportA, rows: fixture.reportA.rows.map((row) => ({ ...row, conversions: 0 })) };
  const reportB = { ...fixture.reportB, rows: fixture.reportB.rows.map((row) => ({ ...row, conversions: 0 })) };
  const result = assess(inputFor(fixture, { reportA, reportB }));
  assert.equal(result.status, 'insufficient');
  assert.match(result.explanation, /Neither selected event/u);
});
