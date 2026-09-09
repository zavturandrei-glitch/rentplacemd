import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Russian canonical URLs are clean and ?lang=ru is permanently redirected", async () => {
  const [seo, sitemap, proxy, helper] = await Promise.all([
    read("lib/seo.ts"),
    read("app/sitemap.ts"),
    read("proxy.ts"),
    read("lib/localizedHref.ts"),
  ]);

  assert.match(seo, /if \(language === "ru"\) return baseUrl \+ path/);
  assert.match(seo, /ru: baseUrl \+ path/);
  assert.doesNotMatch(sitemap, /\?lang=ru/);
  assert.match(proxy, /requestedLanguage === "ru"/);
  assert.match(proxy, /NextResponse\.redirect\(canonicalUrl, 308\)/);
  assert.match(helper, /params\.delete\("lang"\)/);
  assert.match(helper, /language !== "ru"/);
});

test("the project uses its real five language identifiers", async () => {
  const translations = await read("locales/translations.ts");
  assert.match(translations, /export type Language = "ru" \| "ro" \| "en" \| "uk" \| "cs"/);
});

test("direct apartment ID navigation preserves the active language without a reload", async () => {
  const search = await read("components/ApartmentIdSearch.tsx");
  assert.match(search, /router\.push\(getLocalizedHref\(apartmentLink, language\)\)/);
  assert.doesNotMatch(search, /window\.location\.href/);
});

test("catalog and category pages have one rendered primary heading per route", async () => {
  const [catalogPage, intro, content, hero, todayFree] = await Promise.all([
    read("app/apartments/page.tsx"),
    read("components/ApartmentsPageIntro.tsx"),
    read("components/ApartmentCategoryContent.tsx"),
    read("components/Hero.tsx"),
    read("components/TodayFree.tsx"),
  ]);

  assert.match(catalogPage, /<ApartmentsPageIntro \/>/);
  assert.equal((intro.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((content.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1);
  assert.equal((todayFree.match(/<h1\b/g) ?? []).length, 0);
});

test("apartment SEO is server-owned and existing descriptions are visible", async () => {
  const details = await read("components/ApartmentDetails.tsx");
  assert.doesNotMatch(details, /document\.title|MutationObserver|querySelector<HTMLMetaElement>/);
  assert.match(details, /apartmentDescriptionParagraphs/);
  assert.match(details, /apartment-about-title/);
});

test("catalog FAQ is visible and represented by FAQPage schema", async () => {
  const [page, faq, seo] = await Promise.all([
    read("app/apartments/page.tsx"),
    read("components/ApartmentsFaq.tsx"),
    read("lib/seo.ts"),
  ]);

  assert.match(page, /<ApartmentsFaq \/>/);
  assert.match(faq, /apartmentsPageContent\[language\]/);
  assert.match(faq, /copy\.faq/);
  assert.match(seo, /"@type": "FAQPage"/);
  assert.match(seo, /apartmentsPageContent\[language\]\.faq/);
});

test("apartment offers do not claim static availability and use the canonical URL", async () => {
  const seo = await read("lib/seo.ts");
  const offer = seo.slice(seo.indexOf("function offerForApartment"), seo.indexOf("export function getApartmentMetadata"));
  assert.doesNotMatch(offer, /availability/);
  assert.match(offer, /url,/);
  assert.match(seo, /offerForApartment\(\{ price: displayedPrice \}, url\)/);
});
