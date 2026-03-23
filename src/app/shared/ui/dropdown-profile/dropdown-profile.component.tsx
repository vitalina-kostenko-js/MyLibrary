"use client";
import { useAuthStore } from "@/app/shared/store/auth.store";
import { LoginButton, RegisterButton } from "@/app/shared/ui/auth-button";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../pkg/theme/ui/avatar";
import { Button } from "../../../../pkg/theme/ui/button";
import { ProfileMenuContent } from "./profile-menu-content.component";

const ProfileDropdown = () => {
  const tLoading = useTranslations("loading");
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>{tLoading("loading")}</div>;
  }

  if (status === "authenticated") {
    const callbackUrl = `/${locale}`;
    return (
      <ProfileMenuContent
        session={session}
        onLogout={() => {
          useAuthStore.getState().clearAuth();
          signOut({ callbackUrl });
        }}
        trigger={
          <Button variant="ghost" size="icon">
            <Avatar className="size-9.5 rounded-md">
              <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center gap-1.5">
        <LoginButton />
        <RegisterButton />
      </div>
    );
  }

  return null;
};

export default ProfileDropdown;
