# Conversion Discrepancy Triage

Independent product prototype. Scope covers report comparison, evidence-based recommendation rules, and reproducible validation.

## Can these two numbers be compared yet?

A marketer sees fewer conversions in Google Ads than in an analytics report and has to choose what to verify before adjusting a campaign. Google documents differences involving conversion definitions, interaction versus conversion timing, time zones, attribution, and processing. Public practitioner threads describe the same symptom. Those accounts motivate the workflow and leave its prevalence and potential time savings unknown. [Google Ads discrepancy guidance](https://support.google.com/google-ads/answer/7457111) · [Google Analytics conversion guidance](https://support.google.com/analytics/answer/13965727) · [Example practitioner report](https://www.reddit.com/r/PPC/comments/11wlwui/)

## The decision to withhold an answer

The first version put reporting settings beside a totals comparison. It could silently substitute zero for a missing date. It also retained sample settings when a CSV replaced one of the reports. Both behaviors made it possible to present a tidy answer on weak evidence.

The revised tool scopes the comparison to the selected event in each file and the dates their ranges share. It requires an explicit row for each day within that overlap. A confirmed zero is valid data. A missing row could be a sparse export or a missing observation and triggers an insufficient-evidence result. A new upload clears the replaced report’s declared settings and the shared event label. Switching an event also clears the shared label so the old mapping cannot silently apply to the new selection.

With comparable daily coverage, the tool reports the difference and checks declared time basis, attribution, and age. The 48-hour review threshold is deliberately conservative for processing. Attribution can still change after that window. Time zone, lookback windows, counting method, deduplication, and underlying event collection still require source checks. [Data freshness](https://support.google.com/analytics/answer/11198161) · [Attribution settings](https://support.google.com/analytics/answer/10597962)

## Replay the result

Choose a **Sample report pair** in the demo. Each pair is synthetic and is defined in the [demo fixtures](../dist/fixtures.js).
To test CSV upload, use [report A](../samples/report-a.csv) with either [complete report B](../samples/report-b.csv) or [incomplete report B](../samples/report-b-missing-day.csv). Map both events to **Completed purchase**, select **Conversion time** and **Data-driven** for both reports, and enter 74 and 76 hours respectively. The complete pair returns 56 versus 55. The incomplete pair has a missing day and withholds the comparison.

| Sample | Evidence supplied | Expected output | Observed in the revised build |
| --- | --- | --- | --- |
| Comparable reports | 3 days per report. Matched event and declared settings. Totals 56 and 55. | Show the gap and suggest a source-level check. | Difference of 1, or 1.8% of the larger total. |
| Known timing mismatch | 3 days per report. Conversion time versus interaction time. Totals 100 and 86. | Ask the reviewer to align the reporting basis. | 14% gap with a settings check. There is no causal attribution. |
| Incomplete export | A explicitly reports zero on day 2. B has no day-2 row. | Withhold the totals comparison. | Coverage shows A 3/3 and B 2/3. No gap is displayed. |
| Unresolved event mapping | The two source events have no declared shared business action. | Ask which event the reports should be measuring. | Insufficient evidence. No gap is displayed. |

On the missing-day fixture, the old version reported the pair as comparable and computed 37 for B. The revised build returned insufficient evidence. That is a measured change in the prototype’s decision behavior, rather than a claimed improvement in real conversion tracking.

## What was verified and what comes next

Run `npm test` in the standalone project. [Evidence fixtures](../tests/evidence.test.mjs) exercise missing days, explicit zeros, partial overlap, unrelated events, fractional counts, malformed CSV, and invalid age metadata. The demo requires a normalized CSV, and repeated rows are summed, so exported totals mixed with segmented detail must be removed by the reviewer first.

The next study would use paired, approved, redacted exports with a known ground truth. Ask practitioners to identify the next useful source check using their usual workflow and using the tool. Measure recommendation correctness, inappropriate causal conclusions, and the time to reach a defensible next check. Google's public obfuscated GA4 ecommerce data can help exercise import preparation, but an independently generated Ads report would still be needed to study a real paired discrepancy. No practitioner test or observed business impact is reported here. [Google's GA4 sample dataset](https://developers.google.com/analytics/bigquery/web-ecommerce-demo-dataset)
