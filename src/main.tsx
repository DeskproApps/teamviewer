import { Suspense, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { DeskproAppProvider, LoadingSpinner } from "@deskpro/app-sdk";
import { queryClient } from "./query";
import { ErrorFallback } from "./components";
import { App } from "./App";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    <StrictMode>
        <DeskproAppProvider>
            <HashRouter>
                <QueryClientProvider client={queryClient}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <App />
                        </ErrorBoundary>
                    </Suspense>
                </QueryClientProvider>
            </HashRouter>
        </DeskproAppProvider>
    </StrictMode>,
);
