import {
  LanguageDropdownComponent,
  ProfileDropdownComponent,
} from "@/app/shared/ui";
import { Link } from "@/src/pkg/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/pkg/theme/ui/breadcrumb";
import { Button } from "@/src/pkg/theme/ui/button";
import { LanguagesIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import SearchBarComponent from "../../search-bar/search-bar.component";

const HeaderBarComponent = () => {
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
          <SearchBarComponent />
          <LanguageDropdownComponent
            trigger={
              <Button variant="ghost" size="icon">
                <LanguagesIcon />
              </Button>
            }
          />
          <ProfileDropdownComponent />
        </div>
      </div>
    </header>
  );
};

export default HeaderBarComponent;
