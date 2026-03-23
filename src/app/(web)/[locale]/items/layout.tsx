import { LayoutComponent } from "@/app/modules/layout";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutComponent type="public">{children}</LayoutComponent>;
}
