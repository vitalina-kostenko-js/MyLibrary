"use client";
import { useParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ProfileMenuContent } from "./profile-menu-content.component";
import { Button } from "../../../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { LoginButton, RegisterButton } from "../../../features/auth-form";
import { useAuthStore } from "@/app/shared/store/auth.store";

const ProfileDropdown = () => {
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
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
