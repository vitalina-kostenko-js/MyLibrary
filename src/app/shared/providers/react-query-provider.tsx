"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface HydrationProps {
  state: DehydratedState;
  children: ReactNode;
};


export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function ReactQueryHydration({ state, children }: HydrationProps) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}