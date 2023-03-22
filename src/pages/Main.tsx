import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    Button,
    LoadingSpinner,
    useDeskproAppClient,
    useDeskproAppEvents,
    useDeskproLatestAppContext,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { LoadingPage } from "./LoadingPage";
import { HomePage } from "./HomePage";
import { GlobalSignIn } from "./GlobalSignIn";
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
                    <ErrorBlock text="An error occurred" />
                </BaseContainer>
            )}
            {!state.isAuth && (
                <BaseContainer>
                    <ErrorBlock text="Go back to the admin settings form for the app and re-auth from there" />
                </BaseContainer>
            )}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => {
                if (state._error) {
                    console.error(`TeamViewer: ${error}`);
                }
                return (
                    <ErrorBlock text={(
                        <Stack gap={6} style={{ padding: "8px" }} vertical>
                            There was an error!
                            <Button text="Reload" onClick={resetErrorBoundary} icon={faRefresh} intent="secondary" />
                        </Stack>
                    )}/>
                );
            }}>
                <Routes>
                    <Route path="/">
                        <Route path="admin">
                            <Route path="global-sign-in" element={<GlobalSignIn/>} />
                        </Route>
                        <Route path="/home" element={<HomePage/>} />
                        <Route index element={<LoadingPage />} />
                    </Route>
                </Routes>
            </ErrorBoundary>
        </Suspense>
    );
};
