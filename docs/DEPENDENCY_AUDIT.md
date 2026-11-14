# Dependency audit follow-up — 2026-11-08

## Result

**Fixed:** the original19 npm audit package records (1low,4moderate,14high). Final full and production-only audits both report **0 known vulnerabilities** in the installed lockfile. This is the registry advisory result at test time, not a guarantee against undisclosed or future vulnerabilities.

Used ordinary `npm audit fix` within existing compatible dependency ranges, with no `--force`, overrides or major framework upgrade. The first pass left three moderate transitive tooling records; the second compatible pass updated sucrase3.35.0→3.35.1, replacing its old glob dependency with tinyglobby and removing the remaining affected chain.

Direct minimum versions now express the tested patched versions: React Router DOM7.18.5, Vite6.4.5 and PostCSS8.5.32. React18 and Tailwind3 remain. `prop-types`15.8.1 is explicitly declared because the retained legacy components use its runtime contracts; it was already present transitively.

The original19 records include two related shipped package records, react-router and react-router-dom. This static HashRouter site does not expose the framework's server/SSR/RSC endpoints cited by several advisories, but the shipped library was updated regardless. The other17 records belong to build/lint tooling and are not shipped client application modules.

## Every original affected package

Advisory links are the exact primary records returned by the npm registry audit. The complete title, vulnerable version range and dependency paths remain in the JSON evidence.

| Package | Original severity | Exposure | Installed resolution | Original advisories |
| --- | --- | --- | --- | --- |
| @babel/core | low | Development tooling | 7.29.13 | [GHSA-4x5r-pxfx-6jf8](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8) |
| @humanfs/node | moderate | Development tooling | 0.16.8 | [GHSA-p498-v437-472g](https://github.com/advisories/GHSA-p498-v437-472g) |
| ajv | moderate | Development tooling | 6.15.0 | [GHSA-2g4f-4pwh-qvx6](https://github.com/advisories/GHSA-2g4f-4pwh-qvx6) |
| brace-expansion | high | Development tooling | 1.1.21 | [GHSA-f886-m6hf-6m8v](https://github.com/advisories/GHSA-f886-m6hf-6m8v), [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp), [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg), [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895), [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr), [GHSA-qhr7-859c-m2p7](https://github.com/advisories/GHSA-qhr7-859c-m2p7), [GHSA-6j4f-fj2g-mc7p](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p) |
| browserslist | high | Development tooling | 4.29.5 | [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx), [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) |
| flatted | high | Development tooling | 3.4.4 | [GHSA-25h7-pfq9-p65f](https://github.com/advisories/GHSA-25h7-pfq9-p65f), [GHSA-rf6f-7fwh-wjgh](https://github.com/advisories/GHSA-rf6f-7fwh-wjgh) |
| glob | high | Development tooling | Removed from dependency graph | [GHSA-5j98-mcp5-4vw2](https://github.com/advisories/GHSA-5j98-mcp5-4vw2), [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) |
| js-yaml | high | Development tooling | 4.3.2 | [GHSA-mh29-5h37-fv8m](https://github.com/advisories/GHSA-mh29-5h37-fv8m), [GHSA-h67p-54hq-rp68](https://github.com/advisories/GHSA-h67p-54hq-rp68), [GHSA-52cp-r559-cp3m](https://github.com/advisories/GHSA-52cp-r559-cp3m), [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj), [GHSA-2883-xcg3-v3hh](https://github.com/advisories/GHSA-2883-xcg3-v3hh) |
| minimatch | high | Development tooling | 3.1.5 | [GHSA-3ppc-4f35-3m26](https://github.com/advisories/GHSA-3ppc-4f35-3m26), [GHSA-7r86-cg39-jmmj](https://github.com/advisories/GHSA-7r86-cg39-jmmj), [GHSA-23c5-xmqv-rm74](https://github.com/advisories/GHSA-23c5-xmqv-rm74), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) |
| nanoid | high | Development tooling | 3.3.20 | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv), [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8), [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w) |
| picomatch | high | Development tooling | 2.3.2, 4.0.7 | [GHSA-3v7f-55p6-f55p](https://github.com/advisories/GHSA-3v7f-55p6-f55p), [GHSA-c2c7-rcm5-vvqj](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj) |
| postcss | high | Development tooling | 8.5.32 | [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93), [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q), [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp), [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) |
| postcss-selector-parser | moderate | Development tooling | 6.1.6 | [GHSA-w9m9-85wc-3x92](https://github.com/advisories/GHSA-w9m9-85wc-3x92), [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf) |
| react-router | high | Shipped dependency | 7.18.5 | [GHSA-2w69-qvjg-hvjx](https://github.com/advisories/GHSA-2w69-qvjg-hvjx), [GHSA-9jcx-v3wj-wh4m](https://github.com/advisories/GHSA-9jcx-v3wj-wh4m), [GHSA-49rj-9fvp-4h2h](https://github.com/advisories/GHSA-49rj-9fvp-4h2h), [GHSA-8646-j5j9-6r62](https://github.com/advisories/GHSA-8646-j5j9-6r62), [GHSA-8x6r-g9mw-2r78](https://github.com/advisories/GHSA-8x6r-g9mw-2r78), [GHSA-rxv8-25v2-qmq8](https://github.com/advisories/GHSA-rxv8-25v2-qmq8), [GHSA-h5cw-625j-3rxh](https://github.com/advisories/GHSA-h5cw-625j-3rxh), [GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6), [GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg), [GHSA-chx6-hx7r-mcp5](https://github.com/advisories/GHSA-chx6-hx7r-mcp5), [GHSA-2j2x-hqr9-3h42](https://github.com/advisories/GHSA-2j2x-hqr9-3h42), [GHSA-f22v-gfqf-p8f3](https://github.com/advisories/GHSA-f22v-gfqf-p8f3), [GHSA-8v8x-cx79-35w7](https://github.com/advisories/GHSA-8v8x-cx79-35w7), [GHSA-3cgp-3xvw-98x8](https://github.com/advisories/GHSA-3cgp-3xvw-98x8) |
| react-router-dom | high | Shipped dependency | 7.18.5 | via react-router |
| rollup | high | Development tooling | 4.68.0 | [GHSA-mw96-cpmx-2vgc](https://github.com/advisories/GHSA-mw96-cpmx-2vgc) |
| source-map-js | high | Development tooling | 1.2.2 | [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) |
| vite | high | Development tooling | 6.4.5 | [GHSA-g4jq-h2w9-997c](https://github.com/advisories/GHSA-g4jq-h2w9-997c), [GHSA-jqfw-vq24-v9c3](https://github.com/advisories/GHSA-jqfw-vq24-v9c3), [GHSA-93m4-6634-74q7](https://github.com/advisories/GHSA-93m4-6634-74q7), [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9), [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583), [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3), [GHSA-698v-4r3x-3vcv](https://github.com/advisories/GHSA-698v-4r3x-3vcv), [GHSA-r825-w8mm-5pxw](https://github.com/advisories/GHSA-r825-w8mm-5pxw), [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm), [GHSA-9jrq-w75r-8gcw](https://github.com/advisories/GHSA-9jrq-w75r-8gcw), [GHSA-rq7h-c2jc-7f22](https://github.com/advisories/GHSA-rq7h-c2jc-7f22), [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) |
| yaml | moderate | Development tooling | 2.9.1 | [GHSA-48c2-rrv3-qjmp](https://github.com/advisories/GHSA-48c2-rrv3-qjmp) |

## Verification and evidence

- `npm audit --json`:0 findings; `npm audit --omit=dev --json`:0 findings.
- Full `npm run lint`:0errors/0warnings across authored browser source, legacy components, configuration and Node/browser automation scripts. Generated dist/review/vendor artifacts are excluded; authored components are not ignored and validation rules were not switched off.
- `npm run build`:passes using Vite6.4.5.
- Restarted the verified workspace's old Vite6.3.5 process on localhost4182; the replacement is Vite6.4.5 with lockfile-driven dependency optimization. The user preview remains running.
- Post-update Chromium regression:204route/viewport cases,36behaviour checks,34automated accessibility scans; no failures or confirmed axe violations.
- Inactive legacy App client-render sanity check:all6original sections,6project cards and5form fields mount with no runtime/PropTypes errors. Representative apostrophes render unchanged. No contact form was submitted.

Evidence under `.impeccable/qa/`: `dependency-audit-before.json`, `dependency-audit-intermediate.json`, `dependency-audit-after.json`, production-only before/after JSON, `full-lint-after.json`, `legacy-render-after.json`, `comprehensive-results.json`. Lockfile and declared dependency changes are retained in package-lock.json and package.json.
