import type { ComponentProps } from "react";
import type NextLink from "next/link";

export type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };
