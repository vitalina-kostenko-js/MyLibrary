"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useLocale } from "next-intl";
import { useRouter as useNextRouter } from "next/navigation";
import { usePathname, useRouter } from "@/pkg/locale";

//interface
interface ILanguageDropdownProps {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
}

//locales
const LOCALES = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
] as const;

//component
const LanguageDropdownComponent = (props: ILanguageDropdownProps) => {
  const { trigger, defaultOpen, align = "end" } = props;

  const nextRouter = useNextRouter();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [language, setLanguage] = useState(locale);

  const handleChange = (value: string) => {
    setLanguage(value);

    router.replace(pathname, { locale: value });

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

export default LanguageDropdownComponent;
