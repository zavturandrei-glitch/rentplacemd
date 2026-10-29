import { readFile, writeFile } from 'node:fs/promises';
import { parseEnv } from 'node:util';
import { neon } from '@neondatabase/serverless';
import { resolveEventDatabase } from '../lib/eventDatabase.mjs';

const report = { checkedAt:new Date().toISOString(), environment:'preview', expectedBranchId:'br-wild-band-b9c3gc4d', deploymentAllowed:false, remoteVariablesModified:false };
try {
  assertInput();
  const env = parseEnv(await readFile(process.argv[2], 'utf8'));
  report.variableNames = Object.keys(env).filter(key => /^(NEON_|EVENTS_|LEGACY_USE_NEON_DATABASE$|DATABASE_URL$|POSTGRES_URL$|AVAILABILITY_DATABASE_URL$|CITY_VIDEOS_DATABASE_URL$)/.test(key)).sort();
  const candidates = ['EVENTS_DATABASE_URL','NEON_DATABASE_URL','NEON_POSTGRES_URL','NEON_DATABASE_URL_UNPOOLED','NEON_POSTGRES_URL_NON_POOLING'];
  const selected = candidates.find(key => env[key]?.trim());
  report.selectedCalendarVariable = selected ?? null;
  report.connectionAvailability = candidates.filter(key => env[key]).map(key => ({variable:key,exportable:env[key] !== '[SENSITIVE]'}));
  report.sharedDatabaseFallbackDisabled = env.EVENTS_ALLOW_SHARED_DATABASE !== 'true' && env.EVENTS_ALLOW_SHARED_DATABASE !== '[SENSITIVE]';
  report.legacyNeonFallbackDisabled = env.LEGACY_USE_NEON_DATABASE !== 'true' && env.LEGACY_USE_NEON_DATABASE !== '[SENSITIVE]';
  if (!selected || env[selected] === '[SENSITIVE]') {
    report.result = 'remote-connection-unverifiable';
  } else {
    const connection = resolveEventDatabase(env);
    const sql = neon(connection.url);
    const [[row]] = await sql.transaction([sql`SELECT current_setting('neon.branch_id',true) AS branch_id, current_setting('transaction_read_only') AS read_only, to_regclass('public.rentplace_event_state') IS NOT NULL AS state_ready, to_regclass('public.rentplace_event_images') IS NOT NULL AS images_ready`], {readOnly:true, fetchOptions:{signal:AbortSignal.timeout(15000)}});
    report.previewBranchMatches = row.branch_id === report.expectedBranchId;
    report.readOnly = row.read_only === 'on';
    report.schemaReady = row.state_ready && row.images_ready;
    report.result = report.previewBranchMatches ? 'verified-preview' : 'branch-mismatch-stop';
    report.configurationVerified = Boolean(report.previewBranchMatches && report.readOnly && report.schemaReady && report.sharedDatabaseFallbackDisabled && report.legacyNeonFallbackDisabled);
  }
} catch {
  report.result = 'verification-failed-stop';
}
// Deployment is never authorized by this inspection script.
await writeFile('docs/events-vercel-preview-check.json', JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
function assertInput() {
  if (process.argv.length !== 3 || !/^\.env\.events\.remote-check\.[a-f0-9]+$/.test(process.argv[2])) throw new Error('Invalid input');
}
