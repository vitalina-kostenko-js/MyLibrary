"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

//interface
interface IProps {
  children: ReactNode;
}

//session propvider
export function AuthSessionProvider(props: IProps) {
  const { children } = props;

  return <SessionProvider basePath="/auth">{children}</SessionProvider>;
}
