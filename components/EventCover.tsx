"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChisinauEvent } from "@/lib/events";
import type { Language } from "@/locales/translations";

// Original category illustrations, created for this project. These are not event posters.
export default function EventCover({ event, language }: { event: ChisinauEvent; language: Language }) {
  const [failedPath, setFailedPath] = useState<string>();
  const custom = event.image && failedPath !== event.image.path;
  const generic = { ru: "Иллюстрация категории", ro: "Ilustrație de categorie", en: "Category illustration", uk: "Ілюстрація категорії", cs: "Ilustrace kategorie" };
  return <Image src={custom ? event.image!.path : `/events/categories/${event.category}.svg`} alt={custom ? event.image!.alt[language] : `${generic[language]} · ${event.title[language]}`}
    width={800} height={450} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    onError={() => { if (event.image) setFailedPath(event.image.path); }}
    className="mb-5 aspect-video w-full rounded-2xl object-cover" />;
}
