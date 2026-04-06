import { LayoutComponent } from '@/app/modules/layout'
import { ReactNode } from 'react'

interface IPublicLayoutComponentProps {
  children: ReactNode
}

const PublicLayoutComponent = (props: IPublicLayoutComponentProps) => {
  const { children } = props

  return <LayoutComponent>{children}</LayoutComponent>
}

export default PublicLayoutComponent