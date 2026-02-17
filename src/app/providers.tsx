"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import ThemeRegistry from "./ThemeRegistry";

export default function Providers({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeRegistry>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      </QueryClientProvider>
    </ThemeRegistry>
  );
}
