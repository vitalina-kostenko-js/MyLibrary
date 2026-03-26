import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  CirclePlusIcon,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  SquarePenIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface ISession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface IProfileMenuContentProps {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
  onLogout?: () => void;
  session: ISession;
}

const ProfileMenuContentComponent = (props: IProfileMenuContentProps) => {
  const t = useTranslations("profile_menu");

  const { trigger, defaultOpen, align = "end", onLogout, session } = props;

  const { user } = session;

  const itemClasses =
    "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-base outline-none transition-colors focus:bg-slate-100 dark:focus:bg-slate-800";

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-50 min-w-80 overflow-hidden rounded-md border bg-white p-1 shadow-lg dark:bg-slate-950 dark:border-slate-800"
        align={align}
      >
        <DropdownMenuLabel className="flex items-center gap-4 px-4 py-3 font-normal">
          <div className="relative flex h-10 w-10 shrink-0">
            <Avatar className="h-full w-full rounded-full overflow-hidden">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.name ?? ""}
                className="aspect-square h-full w-full"
              />
              <AvatarFallback className="flex h-full w-full items-center justify-center bg-slate-100 uppercase">
                {user?.name?.charAt(0) ?? "?"}
              </AvatarFallback>
            </Avatar>
            <span className="absolute right-0 bottom-0 block size-2.5 rounded-full bg-green-600 ring-2 ring-white dark:ring-slate-950" />
          </div>
          <div className="flex flex-col space-y-0.5 overflow-hidden">
            <span className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
              {user?.name ?? t("user")}
            </span>
            <span className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user?.email ?? ""}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 h-px bg-slate-200 dark:bg-slate-800" />

        <DropdownMenuGroup>
          <DropdownMenuItem className={itemClasses}>
            <UserIcon className="size-5 text-slate-500" />
            <span>{t("myAccount")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={itemClasses}>
            <SettingsIcon className="size-5 text-slate-500" />
            <span>{t("settings")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={itemClasses}>
            <CreditCardIcon className="size-5 text-slate-500" />
            <span>{t("billing")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 h-px bg-slate-200 dark:bg-slate-800" />

        <DropdownMenuGroup>
          <DropdownMenuItem className={itemClasses}>
            <UsersIcon className="size-5 text-slate-500" />
            <span>{t("manageTeam")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={itemClasses}>
            <SquarePenIcon className="size-5 text-slate-500" />
            <span>{t("customization")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={itemClasses}>
            <CirclePlusIcon className="size-5 text-slate-500" />
            <span>{t("addTeamAccount")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 h-px bg-slate-200 dark:bg-slate-800" />

        <DropdownMenuItem
          className={`${itemClasses} text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/10`}
          onSelect={(e) => {
            e.preventDefault();
            onLogout?.();
          }}
        >
          <LogOutIcon className="size-5" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenuContentComponent;
