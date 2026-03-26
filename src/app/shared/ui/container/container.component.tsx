import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
}

const ContainerComponent = (props: IContainerProps) => {
  const { children } = props;

  return <div className="max-w-[1200px] mx-auto px-6 py-6">{children}</div>;
};

export default ContainerComponent;
