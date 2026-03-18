import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "@/src/i18n/navigation";
import { LanguagesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { LanguageDropdown } from "../../../shared/ui/dropdown-language";
import { ProfileDropdown } from "../../../shared/ui/dropdown-profile";
import SearchBar from "../../search-bar/search-bar";

export const HeaderBar = () => {
  const t = useTranslations("navigation");

  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{t("home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-1.5">
          <SearchBar />
          <LanguageDropdown
            trigger={
              <Button variant="ghost" size="icon">
                <LanguagesIcon />
              </Button>
            }
          />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};
