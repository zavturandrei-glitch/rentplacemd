import type {Language} from '@/locales/translations';
const labels={
ru:'Спальня с белой постелью|Спальня: телевизор и шкаф|Вторая жилая комната|Кухня со светлыми шкафами|Обеденная зона у окна|Ванная комната|Отдельный туалет|Прихожая|Лоджия',
ro:'Dormitor cu lenjerie albă|Dormitor: televizor și dulap|A doua cameră|Bucătărie cu dulapuri deschise la culoare|Loc de luat masa lângă fereastră|Baie|Toaletă separată|Hol de intrare|Logie',
en:'Bedroom with white bedding|Bedroom television and wardrobe|Second living room|Kitchen with light cabinets|Dining area by the window|Bathroom|Separate toilet|Entrance hall|Loggia',
uk:'Спальня з білою постіллю|Спальня: телевізор і шафа|Друга житлова кімната|Кухня зі світлими шафами|Обідня зона біля вікна|Ванна кімната|Окремий туалет|Передпокій|Лоджія',
cs:'Ložnice s bílým povlečením|Ložnice s televizí a skříní|Druhý obytný pokoj|Kuchyň se světlými skříňkami|Jídelní kout u okna|Koupelna|Samostatná toaleta|Vstupní chodba|Lodžie',
} satisfies Record<Language,string>;
export const albisoaraRefreshAlts=Object.fromEntries(Object.entries(labels).map(([lang,text])=>[lang,text.split('|').map(t=>t+' · Albișoara 16 · ID 84')])) as Record<Language,string[]>;
