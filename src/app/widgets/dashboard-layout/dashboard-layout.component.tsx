import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { HeaderBar } from "./elements";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="flex min-h-dvh w-full">
    <SidebarProvider>
      <Sidebar>
        <div className="border-sidebar-foreground/10 m-6 h-full rounded-md border bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--sidebar-foreground)10%,transparent),color-mix(in_oklab,var(--sidebar-foreground)10%,transparent)_1px,var(--sidebar)_2px,var(--sidebar)_15px)]" />
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <HeaderBar />
        <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
          {children}
        </main>
        <footer className="bg-card h-10 border-t">
          <div className="mx-auto size-full max-w-7xl px-4 sm:px-6">
            <div className="border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]" />
          </div>
        </footer>
      </div>
    </SidebarProvider>
  </div>
);
