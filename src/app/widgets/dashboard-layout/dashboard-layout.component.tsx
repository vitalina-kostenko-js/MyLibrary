import { HeaderBarComponent } from "./elements";
import { ReactNode } from "react";

//interface
interface IDashboardLayoutProps {
  children: ReactNode;
}

//component
export const DashboardLayoutComponent = (props: IDashboardLayoutProps) => {
  const { children } = props;

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <HeaderBarComponent />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6">
        {children}
      </main>

      <footer className="bg-card h-10 border-t">
        <div className="mx-auto size-full max-w-7xl px-4 sm:px-6">
          <div className="border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]" />
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayoutComponent;
