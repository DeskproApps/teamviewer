import './instrument';
import { Suspense, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import { ErrorFallback } from "./components";
import { App } from "./App";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";
import "./main.css";
import "simplebar/dist/simplebar.min.css";
import { Scrollbar } from "@deskpro/deskpro-ui";
import { ErrorBoundary, reactErrorHandler } from '@sentry/react';

const root = ReactDOM.createRoot(document.getElementById('root') as Element, {
  onRecoverableError: reactErrorHandler(),
});
root.render(
  <StrictMode>
    <Scrollbar style={{ height: "100%", width: "100%" }}>
      <DeskproAppProvider>
        <HashRouter>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary fallback={ErrorFallback}>
                <App />
              </ErrorBoundary>
            </Suspense>
          </QueryClientProvider>
        </HashRouter>
      </DeskproAppProvider>
    </Scrollbar>
  </StrictMode>
);
