import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire, registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const root = new URL("../", import.meta.url);
const require = createRequire(import.meta.url);
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return nextResolve(fileURLToPath(new URL(specifier.slice(2), root)), context);
    }
    return nextResolve(specifier, context);
  },
});
for (const extension of [".ts", ".tsx"]) {
  Module._extensions[extension] = (module, filename) => {
    const source = ts.transpileModule(readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    });
    module._compile(source.outputText, filename);
  };
}

const apartments = require("../lib/apartments.ts");
const { isBuiucaniApartment, isCenterApartment } = require("../lib/apartmentDistricts.ts");
const { getApartmentLocalization, getApartmentLocalizedLanguages } = require("../lib/apartmentLocalization.ts");
const { getApartmentMetadata, getApartmentJsonLd } = require("../lib/seo.ts");
const { getNightCount } = require("../lib/bookingDates.ts");
const { getCalendarWhatsappHref, bookingGuestLabels } = require("../components/AvailabilityCalendar.tsx");
const { rentPlaceLocations } = require("../lib/locations.ts");
// Keep sitemap validation offline while exercising the production generator.
require.cache[require.resolve("../lib/eventStore.ts")] = { exports: { readEventInventory: async () => [] } };
require.cache[require.resolve("../lib/cityVideoStore.ts")] = { exports: { readPublishedCityVideos: async () => [] } };
const { default: sitemap } = require("../app/sitemap.ts");
hooks.deregister();

const apartment = apartments.getActiveApartmentById(52);
const path = "/apartment/ion-creanga-5-2";
const languages = ["ru", "ro", "en", "uk", "cs"];

test("ID 52 resolves to one active Premium listing in Buiucani with six valid image paths", () => {
  assert.equal(apartments.getApartmentPathById("52"), path);
  assert.equal(apartments.getActiveApartmentBySlug("ion-creanga-5-2"), apartment);
  assert.equal(apartments.apartments.filter((item) => String(item.id) === "52").length, 1);
  assert.ok(apartments.getApartmentsByClass("premium").includes(apartment));
  assert.equal(apartments.getApartmentCatalogPrice(apartment), 1000);
  assert.equal(apartment.guests, 2);
  assert.equal(apartment.floor, 6);
  assert.ok(isBuiucaniApartment(apartment));
  assert.ok(!isCenterApartment(apartment));
  assert.equal(apartment.photos.length, 6);
  assert.match(apartment.photos[0], /\/1\.webp$/);
  for (const photo of apartment.photos) {
    const bytes = readFileSync(new URL("public" + photo, root));
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  }
  const location = rentPlaceLocations.find((item) => item.primaryApartmentId === 52);
  assert.equal(location.apartments[0].href, path);
  assert.deepEqual([location.latitude, location.longitude], [47.032595, 28.806204]);
});

test("ID 52 metadata and JSON-LD use the five localized URLs, prices and gallery", () => {
  assert.deepEqual(getApartmentLocalizedLanguages(52), languages);
  const titles = new Set();
  for (const language of languages) {
    const canonical = "https://rentplace.md" + path + (language === "ru" ? "" : "?lang=" + language);
    const localization = getApartmentLocalization(52, language);
    const metadata = getApartmentMetadata(52, language);
    const [schema] = getApartmentJsonLd(52, language, language !== "ru");
    titles.add(metadata.title);
    assert.equal(metadata.alternates.canonical, canonical);
    assert.equal(metadata.alternates.languages[language], canonical);
    assert.equal(localization.imageAlts.length, apartment.photos.length);
    assert.equal(schema.url, canonical);
    assert.equal(schema.priceRange, "1000 MDL");
    assert.equal(schema.numberOfRooms, 1);
    assert.equal(schema.occupancy.maxValue, 2);
  }
  assert.equal(titles.size, languages.length);
});

test("ID 52 WhatsApp messages use actual dates, totals, guest count and language", () => {
  const price = apartments.getApartmentCatalogPrice(apartment);
  for (const language of languages) {
    for (const nights of [1, 2, 3, 7]) {
      const start = "2026-11-20";
      const end = "2026-11-" + (20 + nights);
      assert.equal(getNightCount(start, end), nights);
      for (const guests of [1, 2]) {
        const href = getCalendarWhatsappHref({
          language, apartmentId: apartment.id, address: apartment.address,
          apartmentPath: path, start, end, price, guests,
        });
        const message = new URL(href).searchParams.get("text");
        assert.ok(message.includes("ID 52"));
        assert.ok(message.includes("Ion Creangă 5/2"));
        assert.ok(message.includes("2026"));
        assert.ok(message.includes(String(20 + nights)));
        assert.ok(message.includes(nights * price + " MDL"));
        assert.ok(message.includes(bookingGuestLabels[language] + ": " + guests));
      }
    }
  }
});

test("ID 52 has five reciprocal sitemap entries with the gallery images", async () => {
  const base = "https://rentplace.md" + path;
  const urls = languages.map((language) => base + (language === "ru" ? "" : "?lang=" + language));
  const entries = (await sitemap()).filter(({ url }) => url === base || url.startsWith(base + "?lang="));
  assert.deepEqual(entries.map(({ url }) => url).sort(), urls.sort());
  for (const entry of entries) {
    assert.equal(entry.alternates.languages["x-default"], base);
    for (const url of urls) assert.ok(Object.values(entry.alternates.languages).includes(url));
    for (const photo of apartment.photos) assert.ok(entry.images.includes("https://rentplace.md" + photo));
  }
});
