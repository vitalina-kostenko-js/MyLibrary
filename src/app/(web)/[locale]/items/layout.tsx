import { LayoutComponent } from "@/app/modules/layout";
import { ReactNode } from "react";

//interface
interface IProps {
  children: ReactNode
}

//component
const ItemsLayout = (props: IProps) => {
  const {children} = props

  return <LayoutComponent>{children}</LayoutComponent>;
}

export default ItemsLayout
