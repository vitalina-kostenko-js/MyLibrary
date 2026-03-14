"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/src/i18n/navigation";

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
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState(locale);

  const pathnameWithoutLocale = pathname.replace(/^\/(en|de)(\/|$)/, '$2') || '/';

  const handleChange = (value: string) => {
    setLanguage(value);
    router.replace(pathnameWithoutLocale, { locale: value });
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
