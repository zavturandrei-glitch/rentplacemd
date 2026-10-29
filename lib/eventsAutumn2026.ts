import type { ChisinauEvent, LocalizedText } from './events';

const same = (value: string): LocalizedText => ({ru:value,ro:value,en:value,uk:value,cs:value});
type Listing = {slug:string; name:string; date:string; time:string; venue:string; address?:string; url:string; category?:ChisinauEvent['category']; status?:ChisinauEvent['status']};
const palace = 'Palatul Național „Nicolae Sulac”';
const arena = 'Arena Chișinău';
const opera = 'Teatrul Național de Operă și Balet „Maria Bieșu”';
// Editorially checked direct ticket pages, 29 October 2026. This is not an automated feed.
const listings: Listing[] = [
  {slug:'irina-rimes-2026',name:'IRINA RIMES — LIVE LA CHIȘINĂU',date:'2026-11-13',time:'19:00',venue:palace,url:'https://livetickets.md/ro/event/672--irina-rimes-live-la-chisinau'},
  {slug:'valery-meladze-november-2026',name:'VALERY MELADZE — Concert suplimentar',date:'2026-11-13',time:'20:00',venue:arena,status:'sold-out',url:'https://livetickets.md/ro/event/639--valery-meladze-2026-concert-suplimentar'},
  {slug:'edward-zone-2026',name:'EDWARD ZONE — LANSAREA PROIECTULUI',date:'2026-11-26',time:'19:00',venue:arena,url:'https://livetickets.md/ro/event/725--edward-zone-lansarea-proiectului'},
  {slug:'didula-2026',name:'DiDuLa',date:'2026-11-26',time:'19:00',venue:palace,url:'https://livetickets.md/ro/event/636--didula-la-chisinau'},
  {slug:'moya-mishel-2026',name:'Моя Мишель',date:'2026-11-27',time:'22:00',venue:'SOHO Evolution Night Club',url:'https://sohoclub.md/ro'},
  {slug:'dulapul-dance-2026',name:'Dulapul — dance performance',date:'2026-12-14',time:'19:00',venue:opera,category:'theatre',url:'https://livetickets.md/ro/event/711--spectacol-de-dans-%22dulapul%22'},
  {slug:'slava-vakarchuk-2026',name:'SLAVA VAKARCHUK',date:'2026-12-15',time:'19:00',venue:palace,url:'https://livetickets.md/ro/event/652--slava-vakarchuk'},
  {slug:'nostalgia-retro-night-2026',name:'Nostalgia Retro Night Party 2026',date:'2026-12-20',time:'17:00',venue:arena,url:'https://livetickets.md/ro/event/638--nostalgia-retro-night-party-2026'},
  {slug:'chinese-circus-zensation-2026',name:'Grand Chinese National Circus — ZENsation',date:'2026-12-22',time:'19:00',venue:arena,category:'family',url:'https://livetickets.md/ro/event/720--grand-chinese-national-circus-zensation'},
  {slug:'abba-mania-2026',name:'ABBA tribute by MANIA',date:'2026-12-22',time:'19:00',venue:palace,url:'https://livetickets.md/ro/event/669--abba-tribute-by-mania'},
];

export const autumn2026Events: ChisinauEvent[] = listings.map(item => {
  const description: LocalizedText = {
    ru:`${item.name}: ${item.date}, ${item.time}, ${item.venue}. Дата и начало указаны в проверенном объявлении; правила входа сверяйте по ссылке источника.`,
    ro:`${item.name}: ${item.date}, ${item.time}, ${item.venue}. Data și ora de început sunt anunțate de sursa verificată; consultați regulile de acces la sursă.`,
    en:`${item.name}: ${item.date}, ${item.time}, ${item.venue}. The checked listing confirms the date and start time; consult the source for admission details.`,
    uk:`${item.name}: ${item.date}, ${item.time}, ${item.venue}. Дату й початок підтверджує перевірене оголошення; правила входу дивіться за посиланням джерела.`,
    cs:`${item.name}: ${item.date}, ${item.time}, ${item.venue}. Ověřené oznámení potvrzuje datum a začátek; podmínky vstupu najdete u zdroje.`,
  };
  const title = same(item.name);
  if (item.slug==='dulapul-dance-2026') Object.assign(title,{ru:'Dulapul — танцевальный спектакль',ro:'Dulapul — spectacol de dans',en:'Dulapul — dance performance',uk:'Dulapul — танцювальна вистава',cs:'Dulapul — taneční představení'});
  const address=item.address || (item.venue===palace?'Strada Pușkin 21, Chișinău':item.venue===arena?'Calea Orheiului 130, Stăuceni, mun. Chișinău':item.venue===opera?'Bulevardul Ștefan cel Mare și Sfânt 152, Chișinău':undefined);
  return {id:item.slug,slug:item.slug,title,description,demandReason:{ru:'Событие может увеличить спрос на ночёвку; наличие жилья проверяется отдельно.',ro:'Evenimentul poate crește cererea de cazare; disponibilitatea se verifică separat.',en:'The event may increase overnight demand; accommodation availability is checked separately.',uk:'Подія може збільшити попит на ночівлю; наявність житла перевіряється окремо.',cs:'Akce může zvýšit zájem o přenocování; dostupnost ubytování se ověřuje samostatně.'},startDate:item.date,startTime:item.time,demandStart:item.date,demandEnd:item.date,venue:same(item.venue),...(address?{address:same(address)}:{}),city:'Chisinau',category:item.category??'concert',interest:'medium',sourceName:item.url.includes('sohoclub')?'SOHO Evolution':'LiveTickets',sourceUrl:item.url,...(item.url.includes('livetickets')?{ticketUrl:item.url}:{}),verifiedAt:'2026-10-29',status:item.status??'scheduled',translatedLanguages:['ru','ro','en','uk','cs']};
});
