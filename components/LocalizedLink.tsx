"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalizedHref } from "@/lib/localizedHref";

type LocalizedLinkProps = ComponentProps<typeof Link>;

export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { language } = useLanguage();
  const localizedHref = typeof href === "string" ? getLocalizedHref(href, language) : href;

  return <Link href={localizedHref} {...props} />;
}
