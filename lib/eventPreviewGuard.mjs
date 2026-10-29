import { neon } from '@neondatabase/serverless';
import { resolveEventDatabase } from './eventDatabase.mjs';

export const expectedEventPreviewBranch = 'br-wild-band-b9c3gc4d';

/** A separate factory keeps the fail-closed behavior testable without a database. */
export function createEventPreviewGuard(createSql = neon) {
  let verifiedUrl;
  let pending;
  return async function verify(env) {
    if (env.VERCEL_ENV !== 'preview') return { required: false };
    try {
      const connection = resolveEventDatabase(env);
      if (!connection) throw new Error('Missing Preview connection');
      if (verifiedUrl !== connection.url || !pending) {
        verifiedUrl = connection.url;
        pending = (async () => {
          const sql = createSql(connection.url);
          const [[row]] = await sql.transaction([
            sql`SELECT current_setting('neon.branch_id', true) AS branch_id, current_setting('transaction_read_only') AS read_only`,
          ], { readOnly: true, fetchOptions: { signal: AbortSignal.timeout(15000) } });
          if (row?.branch_id !== expectedEventPreviewBranch || row?.read_only !== 'on') throw new Error('Preview rejected');
          return { required: true, verified: true, expectedBranchId: expectedEventPreviewBranch, readOnly: true };
        })();
      }
      return await pending;
    } catch {
      pending = undefined;
      // Never propagate driver errors, URLs or credentials into Next.js logs.
      throw new Error('Events Preview database verification failed. Calendar access blocked; connection details hidden.');
    }
  };
}

export const verifyEventPreviewBranch = createEventPreviewGuard();
