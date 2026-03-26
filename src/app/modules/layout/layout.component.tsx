import { ContainerComponent } from "@/app/shared/ui/container";
import { HeaderBarComponent } from "@/app/widgets/dashboard-layout";
import { ReactNode } from "react";

interface ILayoutComponentProps {
  children: ReactNode;
  type: "public" | "protected";
}

const LayoutComponent = (props: ILayoutComponentProps) => {
  const { children, type } = props;

  return (
    <div className="relative z-0 flex min-h-dvh flex-col">
      {type === "public" && <HeaderBarComponent />}

      <ContainerComponent>{children}</ContainerComponent>
    </div>
  );
};

export default LayoutComponent;