"use client";

import type { DehydratedState } from "@tanstack/react-query";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useRef } from "react";

//interface
interface IHydrationProps {
  state: DehydratedState;
  children: ReactNode;
}

interface IPropviderProps {
  children: ReactNode;
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
    },
  });
};

//query provider
export const ReactQueryProvider = (props: IPropviderProps) => {
  const { children } = props;

  const queryClientRef = useRef<QueryClient>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = makeQueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {children}
    </QueryClientProvider>
  );
};

//query hydration
export const ReactQueryHydration = (props: IHydrationProps) => {
  const { state, children } = props;

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
};
