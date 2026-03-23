"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { usePathname, useRouter } from "@/src/pkg/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/src/pkg/theme/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useRouter as useNextRouter } from "next/navigation";

type Props = {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
};

const LOCALES = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
] as const;

const LanguageDropdown = ({ defaultOpen, align, trigger }: Props) => {
  const nextRouter = useNextRouter();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState(locale);

  const pathnameWithoutLocale =
    pathname.replace(/^\/(en|de)(\/|$)/, "$2") || "/";

  const handleChange = (value: string) => {
    setLanguage(value);
    router.replace(pathnameWithoutLocale, { locale: value });
    nextRouter.refresh();
  };

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align={align || "end"}>
        <DropdownMenuRadioGroup value={language} onValueChange={handleChange}>
          {LOCALES.map(({ value, label }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className="data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground pl-2 text-base [&>span]:hidden"
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
