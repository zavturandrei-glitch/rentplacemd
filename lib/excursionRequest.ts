type RequestInput = {
  routeTitle: string;
  date: string;
  guests: string;
  tourLanguage: string;
  labels: { request: string; route: string; date: string; guests: string; language: string; unspecified: string };
};

export function buildExcursionWhatsAppUrl({ routeTitle, date, guests, tourLanguage, labels }: RequestInput) {
  const message = [labels.request, `${labels.route}: ${routeTitle}`, `${labels.date}: ${date || labels.unspecified}`, `${labels.guests}: ${guests || labels.unspecified}`, `${labels.language}: ${tourLanguage.trim() || labels.unspecified}`].join("\n");
  return `https://wa.me/37369990190?text=${encodeURIComponent(message)}`;
}
