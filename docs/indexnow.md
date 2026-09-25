# IndexNow

Manual, dependency-free Node.js submission to https://api.indexnow.org/indexnow.
No page-view hooks, startup hooks, cron, sitemap crawling, or automatic retries.
Requires Node.js 20+ and outbound HTTPS. Run from the repository root.

## Deploy first

The UTF-8 file `public/f22216ee4b8b40e0bb84776e71fe267e.txt` must be deployed at:
https://rentplace.md/f22216ee4b8b40e0bb84776e71fe267e.txt

Its body must contain exactly `f22216ee4b8b40e0bb84776e71fe267e`.
No Vercel environment variables or configuration changes are needed.

After deployment, submit ID84 once:

```sh
node scripts/submit-indexnow.mjs https://rentplace.md/apartment/albisoara-16-84
```

Preview the payload without network requests:

```sh
node scripts/submit-indexnow.mjs --dry-run https://rentplace.md/apartment/albisoara-16-84
```

## Subsequent content changes

After publishing a new apartment or a material public content/SEO change, run the script
with only the changed canonical URLs as space-separated arguments. It removes duplicates
within that invocation and sends one POST. Do not rerun for unchanged pages or wire it into
every deployment/view. There is no cross-run history: choosing genuinely changed URLs is
the operator's responsibility.

For removed pages use `--deleted` followed by their former URLs. This mode requires HTTP
404 or 410; submit additions/updates separately. Normal mode requires HTTP 200.
The script verifies the live key file and every listed URL before any POST, refuses
redirects, foreign origins, credentials, fragments and admin/API paths, and times out
each request after 20 seconds. A failed preflight means no IndexNow submission was sent.
An API/network error is not retried automatically; an interrupted POST may have reached
the service, so do not immediately repeat it blindly. HTTP 429 means stop and back off.

HTTP 200 means received; HTTP 202 means received with key validation pending.
Neither confirms crawling/indexing or guarantees a change in Bing's status.

Sources: https://www.indexnow.org/documentation and https://www.indexnow.org/faq
