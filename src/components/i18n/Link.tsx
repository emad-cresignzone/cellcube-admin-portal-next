"use client";

import NextLink from "next/link";
import { useI18n } from "@/context/I18nProvider";
import type { LinkProps } from "../interfaces/I18nProps";

/**
 * Drop-in replacement for next/link that keeps the active locale in the URL.
 * External, hash and mailto hrefs pass through untouched.
 */
export default function Link({ href, ...props }: LinkProps) {
  const { href: localize } = useI18n();
  return <NextLink href={localize(href)} {...props} />;
}
