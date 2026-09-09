import type { Language } from "@/locales/translations";

const externalScheme = /^[a-z][a-z\d+.-]*:/i;

export function getLocalizedHref(href: string, language: Language) {
  if (!href || href.startsWith("#") || href.startsWith("//") || externalScheme.test(href)) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";
  const params = new URLSearchParams(query);

  params.delete("lang");
  if (language !== "ru") params.set("lang", language);

  const nextQuery = params.toString();
  return pathname + (nextQuery ? `?${nextQuery}` : "") + hash;
}

export function getLanguageSwitchHref(
  pathname: string,
  currentSearch: string,
  language: Language,
) {
  return getLocalizedHref(
    pathname + (currentSearch ? `?${currentSearch.replace(/^\?/, "")}` : ""),
    language,
  );
}
