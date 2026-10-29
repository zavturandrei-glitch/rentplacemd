export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.VERCEL_ENV === 'preview') {
    const { verifyEventPreviewBranch } = await import('./lib/eventPreviewGuard.mjs');
    await verifyEventPreviewBranch(process.env);
    console.info('Events Preview database branch verified (read-only).');
  }
}
