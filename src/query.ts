import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1500,
    },
  },
});

const QueryKey = {
  SESSIONS: "sessions",
  SESSION: "session",
}

export { queryClient, QueryKey };
