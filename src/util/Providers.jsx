"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ChakraProvider} from "@chakra-ui/react";

export default function Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
