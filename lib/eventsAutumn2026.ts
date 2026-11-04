import type { ChisinauEvent, LocalizedText } from './events';

const same = (value: string): LocalizedText => ({ru:value,ro:value,en:value,uk:value,cs:value});
type Listing = {slug:string; name:string; date:string; endDate?:string; city?:ChisinauEvent["city"]; time?:string; venue:string; address?:string; url:string; category?:ChisinauEvent['category']; verifiedAt?:string; interest?:ChisinauEvent['interest']; status?:ChisinauEvent['status']};
const palace = 'Palatul Național „Nicolae Sulac”';
const arena = 'Arena Chișinău';
const opera = 'Teatrul Național de Operă și Balet „Maria Bieșu”';
// Editorially checked direct ticket pages, 29 October 2026. This is not an automated feed.
const listings: Listing[] = [
  {slug:'beauty-2027',name:'BEAUTY 2027',date:'2027-02-25',endDate:'2027-02-28',venue:'CIE Moldexpo',address:'Strada Ghioceilor 1, Chișinău',category:'business',interest:'high',verifiedAt:'2026-11-04',url:'https://beauty.moldexpo.md/o-vystavke/'},
  {slug:'feteasca-run-2027',name:'Feteasca Run 2027',date:'2027-09-25',venue:'Casa Vinicolă Luca, Cricova',address:'Strada Buna Vestire 17, Cricova',city:'Moldova-near-Chisinau',category:'sport',interest:'medium',verifiedAt:'2026-11-04',url:'https://www.carpediem.md/events'},
  {slug:'skryptonite-2027',name:'SKRYPTONITE',date:'2027-01-23',time:'19:00',venue:arena,interest:'high',verifiedAt:'2026-11-04',url:'https://livetickets.md/en/event/578--skryptonite'},
  {slug:'skillet-2027',name:'SKILLET — After the Storm',date:'2027-07-25',time:'20:00',venue:'Arena Chișinău — Open Air',address:'Calea Orheiului 130, Stăuceni, mun. Chișinău',interest:'high',verifiedAt:'2026-11-04',url:'https://livetickets.md/ru/event/719--skillet-coming-to-chisinau'},
  {slug:'till-lindemann-2027',name:'Till Lindemann — World Tour 2027',date:'2027-11-30',venue:arena,interest:'very-high',url:'https://www.entertix.md/events/42437/till-lindemann-world-tour-2027-30-november-2027-chisinau-arena-chisinau.html'},
  {slug:'the-las-vegas-show-2027',name:'The Las Vegas Show',date:'2027-02-24',time:'19:30',venue:arena,url:'https://www.entertix.md/en/events'},
  {slug:'valery-meladze-11-november-2026',name:'Валерий Меладзе',date:'2026-11-11',time:'20:00',venue:arena,status:'sold-out',interest:'very-high',verifiedAt:'2026-11-04',url:'https://meladze.eu/concerts'},
  {slug:'3-sud-est-18-november-2026',name:'3 SUD EST',date:'2026-11-18',time:'19:00',venue:palace,url:'https://www.entertix.md/events/39491/3-sud-est-18-november-2026-palatul-national-chisinau.html'},
  {slug:'3-sud-est-19-november-2026',name:'3 SUD EST',date:'2026-11-19',time:'19:00',venue:palace,url:'https://www.entertix.md/events/39492/3-sud-est-19-november-2026-palatul-national-chisinau.html'},
  {slug:'vali-boghean-2026',name:'Vali Boghean Band',date:'2026-12-29',time:'19:00',venue:palace,url:'https://www.entertix.md/events/42399/vali-boghean-band-29-december-2026-palatul-national-chisinau.html'},
  {slug:'sukhishvili-2027',name:'Sukhishvili',date:'2027-01-29',time:'19:30',venue:palace,category:'theatre',url:'https://www.entertix.md/events/39599/sukhishvili-29-january-2027-palatul-national-chisinau.html'},
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
    ru:`${item.name}: ${item.date}${item.time ? ", " + item.time : ""}, ${item.venue}. Дата указана в объявлении; время показывается, если опубликовано; правила входа сверяйте по ссылке источника.`,
    ro:`${item.name}: ${item.date}${item.time ? ", " + item.time : ""}, ${item.venue}. Data este anunțată; ora este afișată dacă a fost publicată; consultați regulile de acces la sursă.`,
    en:`${item.name}: ${item.date}${item.time ? ", " + item.time : ""}, ${item.venue}. The listing confirms the date; the start time is shown when published; consult the source for admission details.`,
    uk:`${item.name}: ${item.date}${item.time ? ", " + item.time : ""}, ${item.venue}. Дату підтверджує оголошення; час показано, якщо опубліковано; правила входу дивіться за посиланням джерела.`,
    cs:`${item.name}: ${item.date}${item.time ? ", " + item.time : ""}, ${item.venue}. Oznámení potvrzuje datum; čas je uveden, pokud byl zveřejněn; podmínky vstupu najdete u zdroje.`,
  };
  const title = same(item.name);
  if (item.slug==='dulapul-dance-2026') Object.assign(title,{ru:'Dulapul — танцевальный спектакль',ro:'Dulapul — spectacol de dans',en:'Dulapul — dance performance',uk:'Dulapul — танцювальна вистава',cs:'Dulapul — taneční představení'});
  const address=item.address || (item.venue===palace?'Strada Pușkin 21, Chișinău':item.venue===arena?'Calea Orheiului 130, Stăuceni, mun. Chișinău':item.venue===opera?'Bulevardul Ștefan cel Mare și Sfânt 152, Chișinău':undefined);
  return {id:item.slug,slug:item.slug,title,description,demandReason:{ru:'Событие может увеличить спрос на ночёвку; наличие жилья проверяется отдельно.',ro:'Evenimentul poate crește cererea de cazare; disponibilitatea se verifică separat.',en:'The event may increase overnight demand; accommodation availability is checked separately.',uk:'Подія може збільшити попит на ночівлю; наявність житла перевіряється окремо.',cs:'Akce může zvýšit zájem o přenocování; dostupnost ubytování se ověřuje samostatně.'},startDate:item.date,...(item.endDate?{endDate:item.endDate}:{}),startTime:item.time,demandStart:item.date,demandEnd:item.endDate??item.date,venue:same(item.venue),...(address?{address:same(address)}:{}),city:item.city??'Chisinau',category:item.category??'concert',interest:item.interest??'medium',sourceName:item.url.includes('moldexpo')?'Moldexpo':item.url.includes('carpediem')?'Carpe Diem':item.url.includes('meladze.eu')?'Valery Meladze':item.url.includes('entertix')?'Entertix':item.url.includes('sohoclub')?'SOHO Evolution':'LiveTickets',sourceUrl:item.url,...((item.url.includes('livetickets')||item.url.includes('entertix'))?{ticketUrl:item.url}:{}),verifiedAt:item.verifiedAt??(item.url.includes('entertix')?'2026-11-04':'2026-10-29'),status:item.status??'scheduled',translatedLanguages:['ru','ro','en','uk','cs']};
});






