import { LayoutComponent } from '@/app/modules/layout'
import { ReactNode } from 'react'

//interface
interface IPublicLayoutComponentProps {
  children: ReactNode
}

//component
const PublicLayoutComponent = (props: IPublicLayoutComponentProps) => {
  const { children } = props

  return <LayoutComponent type='public'>{children}</LayoutComponent>
}

export default PublicLayoutComponent