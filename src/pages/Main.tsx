import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import {
    LoadingSpinner,
    useDeskproAppClient,
    useDeskproAppEvents,
    useDeskproLatestAppContext,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { DEFAULT_ERROR } from "../constants";
import { LoadingAppPage } from "./LoadingAppPage";
import { HomePage } from "./HomePage";
import { GlobalSignIn } from "./GlobalSignIn";
import { ErrorFallback } from "../components/Error";
import { ErrorBlock, BaseContainer } from "../components/common";

export const Main = () => {
    const { context } = useDeskproLatestAppContext();
    const { client } = useDeskproAppClient();
    const [state] = useStore();
    const location = useLocation();
    const { pathname } = location;

    if (state._error) {
        console.error(`TeamViewer: ${state._error}`);
    }

    useInitialisedDeskproAppClient((client) => {
        client?.registerElement("refreshButton", {
            type: "refresh_button"
        });
    });

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
    }, [client]);

    // We don't have a context in admin that we care about, so just load the page straight away
    if (!["/admin/global-sign-in"].includes(pathname) && !context) {
        return <LoadingSpinner />;
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            {state.isAuth && state._error && (
                <BaseContainer>
                    <ErrorBlock text={DEFAULT_ERROR} />
                </BaseContainer>
            )}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                    <Route path="/">
                        <Route path="admin">
                            <Route path="global-sign-in" element={<GlobalSignIn/>} />
                        </Route>
                        <Route path="/home" element={<HomePage/>} />
                        <Route index element={<LoadingAppPage />} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        </Suspense>
    );
};
