import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {autumn2026Events} from '../lib/eventsAutumn2026.ts';
import {validateEvent,mergeEvents,emptyEventState} from '../lib/eventsWorkflow.ts';
import {chisinauDate,eventMonths} from '../lib/eventDates.ts';

test('new November/December listings validate in all five languages and retain supplied start times',()=>{
  assert.equal(autumn2026Events.length,10);
  assert.equal(new Set(autumn2026Events.map(e=>e.slug)).size,10);
  for(const event of autumn2026Events){
    const validated=validateEvent(event);
    assert.deepEqual(validated.translatedLanguages,['ru','ro','en','uk','cs']);
    assert.match(event.sourceUrl,/^https:\/\/(livetickets\.md|sohoclub\.md)\//);
    assert.equal(validated.startTime,event.startTime);
    assert.ok(event.startDate>='2026-11-01' && event.startDate<='2026-12-31');
  }
});
test('sold-out status survives state updates; admin merges do not duplicate the source listing',()=>{
  const event=autumn2026Events.find(e=>e.slug==='valery-meladze-november-2026');
  assert.equal(event.status,'sold-out');
  const state=emptyEventState();
  state.overrides[event.slug]=validateEvent({...event,status:'cancelled'});
  const merged=mergeEvents(autumn2026Events,state);
  assert.equal(merged.length,autumn2026Events.length);
  assert.equal(merged.find(e=>e.slug===event.slug).status,'cancelled');
  assert.equal(event.status,'sold-out');
});
test('Plaiiesii sessions do not reuse the old unverified 19:00 and Galkin is sold out',async()=>{
  const source=await readFile(new URL('../lib/events.ts',import.meta.url),'utf8');
  const plai=source.split('\n').find(line=>line.includes('e({ slug: "plaiesii-2026"'));
  assert.match(plai,/startDate: "2026-12-11", endDate: "2026-12-12"/);
  assert.doesNotMatch(plai,/startTime:/);
  assert.match(plai,/iticket\.md\/event\/plaiesii/);
  assert.match(source.split('\n').find(line=>line.includes('e({ slug: "maxim-galkin-2026"')),/status: "sold-out"/);
});
test('current month and overlapping events move to January in Chisinau time',()=>{
  assert.equal(chisinauDate(new Date('2026-12-31T21:59:59Z')),'2026-12-31');
  assert.equal(chisinauDate(new Date('2026-12-31T22:00:00Z')),'2027-01-01');
  assert.deepEqual(eventMonths([{startDate:'2026-12-31',endDate:'2027-01-02'}]),['2026-12','2027-01']);
});
test('calendar has exactly one daily Hobby cron, with no build-time refresh',async()=>{
  const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
  assert.deepEqual(config.crons,[{path:'/api/cron/events',schedule:'0 4 * * *'}]);
  const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
  assert.doesNotMatch(pkg.scripts.build,/migrat|refresh|cron/);
});
