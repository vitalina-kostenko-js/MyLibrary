import { LayoutComponent } from "@/app/modules/layout";
import { ReactNode } from "react";

//interface
interface IProps {
  children: ReactNode
}

//layout
const ItemsLayout = (props: IProps) => {
  const {children} = props

  return <LayoutComponent type="public">{children}</LayoutComponent>;
}

export default ItemsLayout
