import { readFile } from 'node:fs/promises';
import { preparePreviewEnvironment } from './preview-events-env.mjs';
import { verifyEventPreviewBranch } from '../lib/eventPreviewGuard.mjs';
try {
  const { values } = preparePreviewEnvironment(await readFile('.env.events.preview.local','utf8'));
  console.log(JSON.stringify(await verifyEventPreviewBranch(values)));
} catch {
  console.error('Preview startup guard rejected the connection. Details hidden.');
  process.exitCode = 1;
}
