import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const host = "rentplace.md";
export const key = "f22216ee4b8b40e0bb84776e71fe267e";
export const keyLocation = `https://${host}/${key}.txt`;
export const endpoint = "https://api.indexnow.org/indexnow";

export function createPayload(urls) {
  if (!urls.length) throw new Error("Specify at least one changed public URL.");
  const urlList = [...new Set(urls.map((value) => {
    const url = new URL(value);
    if (url.origin !== `https://${host}` || url.username || url.password || url.hash) {
      throw new Error(`Only https://${host} URLs without credentials or fragments are allowed: ${value}`);
    }
    if (/^\/(?:api|admin|_next)(?:\/|$)/i.test(decodeURIComponent(url.pathname))) {
      throw new Error(`Not a public page: ${value}`);
    }
    return url.href;
  }))];
  if (urlList.length > 10_000) throw new Error("IndexNow allows at most 10,000 URLs per request.");
  return { host, key, keyLocation, urlList };
}

export async function submitUrls(urls, { deleted = false, dryRun = false, fetchImpl = fetch } = {}) {
  const payload = createPayload(urls);
  if (dryRun) return { dryRun: true, payload };

  const request = (url, options = {}) => fetchImpl(url, {
    redirect: "error",
    signal: AbortSignal.timeout(20_000),
    ...options,
  });
  const verification = await request(keyLocation);
  if (verification.status !== 200 || await verification.text() !== key) {
    throw new Error(`Key verification failed (HTTP ${verification.status}). Deploy the exact key file first. No submission sent.`);
  }

  // Validate the deployed state before sending any URLs, including removals.
  for (const url of payload.urlList) {
    const page = await request(url);
    await page.body?.cancel();
    const allowed = deleted ? [404, 410] : [200];
    if (!allowed.includes(page.status)) {
      throw new Error(`Preflight failed for ${url}: HTTP ${page.status}; expected ${allowed.join(" or ")}. No submission sent.`);
    }
  }

  // One explicit batch, no scheduled runs, automatic retries or sitemap crawling.
  const response = await request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  await response.body?.cancel();
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow HTTP ${response.status}. Submission not confirmed; no automatic retry.`);
  }
  return { status: response.status, count: payload.urlList.length };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("Usage: node scripts/submit-indexnow.mjs [--dry-run] [--deleted] https://rentplace.md/changed-page [...URLs]");
    return;
  }
  const unknown = args.find((arg) => arg.startsWith("--") && !["--dry-run", "--deleted"].includes(arg));
  if (unknown) throw new Error(`Unknown option: ${unknown}`);
  const result = await submitUrls(args.filter((arg) => !arg.startsWith("--")), {
    deleted: args.includes("--deleted"),
    dryRun: args.includes("--dry-run"),
  });
  if (result.dryRun) console.log(JSON.stringify(result, null, 2));
  else console.log(`IndexNow HTTP ${result.status}: ${result.count} URL(s) received.${result.status === 202 ? " Key validation pending." : ""} This does not confirm crawling or indexing.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
