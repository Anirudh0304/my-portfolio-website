# Negative Keyword Preflight

Independent product prototype. Scope covers the launch-review workflow, matching engine, and reproducible validation.

## Which search conflicts would this change introduce?

An agency specialist reviewing a proposed Google Search campaign change wants to exclude low-value searches while protecting terms the campaign intentionally targets. Google documents accidental negative-keyword conflicts, explains the limits of keyword diagnostics, and recommends checking the dates and campaign assignments of negative lists. Google Ads Editor already warns about certain targeting conflicts. The opportunity explored here is a review of **a supplied set of must-keep searches against two proposed list states**, before publishing any changes. Demand for this workflow has yet to be validated with practitioners. [Google Ads troubleshooting](https://support.google.com/google-ads/answer/9701952) · [Google Ads Editor checks](https://support.google.com/google-ads/editor/answer/79781)

## What changed in the tool

The first version showed whether a proposed rule matched a query. It treated a conflict that already existed and one caused by the edit the same way. The revised tool keeps the rule explanation and adds a before/after review. It labels each search as a new conflict, an existing conflict, a removed conflict, unchanged, or uncertain.

The reviewer marks searches that must remain eligible. A direct conflict on one of those searches calls for launch review. Other direct conflicts are warnings. An incomplete or unsupported rule can also leave the change uncertain. This gives the reviewer a decision to make and a concrete rule to inspect. The tool works with pasted strings and models a limited subset of the documented Search rules. [Negative keyword match rules](https://support.google.com/google-ads/answer/2453972)

## Replay the result

Open the demo and choose **Restore sample**. The synthetic current list contains a phrase negative for `"free trial"`. The proposed replacement retains it and adds broad `free` and exact `[free project management software]`.

| Search | Expected review outcome | Observed |
| --- | --- | --- |
| `! free project management software` | New must-keep conflict | Launch review. Broad and exact rules both match. |
| `free project management software for small teams` | New regular conflict | Warning. Only broad `free` matches. |
| `best free trial project management tool` | Existing conflict | The phrase rule already matched before the change. |
| `project management software for teams` | Unchanged | No direct supported text match in either list. |

Remove the broad and exact additions to replay the change in reverse, using the proposed list as the current list. The first two conflicts disappear from the supported match set. That changes the review report for these four inputs. There is no serving, spend, or customer outcome metric in this case study.

## What the tests actually caught

The first version truncated a query to 16 words before checking exact equality. A supplied exact negative for the first 16 words therefore reported a match on a 17-word query. The revised matcher keeps the 16-word evaluation boundary for the supported simulation and checks the full query length before declaring exact equality. The old build returned a warning and the new build returned no direct match on the same synthetic input.

Run `npm test` in the standalone project. [Evidence fixtures](../tests/evidence.test.mjs) cover positive and negative controls for match types, punctuation the simulator cannot interpret, literal multilingual terms, and all five comparison outcomes. The tests check the app's stated contract against fixed expectations. They do not benchmark Google Ads serving.

The next study would give paid-search reviewers the same list change with the tool and with their usual spreadsheet or Editor workflow. Record whether they identify the newly introduced must-keep conflicts, whether they incorrectly escalate pre-existing conflicts, and how long it takes to explain the offending rule. That study has yet to run.
