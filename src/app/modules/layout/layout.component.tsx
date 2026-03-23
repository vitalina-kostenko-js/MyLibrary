import type { FC, ReactNode } from "react";
import { HeaderBar } from "@/app/widgets/dashboard-layout/elements/header-bar.component";
import { ContainerUI } from "@/app/shared/ui/container";


export interface LayoutComponentProps {
  children: ReactNode;
  type: "public" | "protected";
}

export const LayoutComponent: FC<LayoutComponentProps> = ({ children, type }) => {
  return (
    <div className="relative z-0 flex min-h-dvh flex-col">
      {type === "public" && <HeaderBar />}

      <ContainerUI>{children}</ContainerUI>
    </div>
  );
};