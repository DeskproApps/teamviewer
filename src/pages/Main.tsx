import { Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import {
    Stack,
    Button,
    useDeskproAppClient,
    useDeskproAppEvents,
    useDeskproLatestAppContext,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { pingService } from "../services/teamviewer";
import { useStore } from "../context/StoreProvider/hooks";
import { LoadingPage } from "./LoadingPage";
import { HomePage } from "./HomePage";
import { GlobalSignIn } from "./GlobalSignIn";
import { ErrorBlock } from "../components/common";

export const Main = () => {
    const { context } = useDeskproLatestAppContext();
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const navigate = useNavigate();
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

    useInitialisedDeskproAppClient((client) => {
        pingService(client)
            .then(({ token_valid }) => {
                dispatch({ type: "setAuth", isAuth: token_valid })
                token_valid && navigate("/home");
            })
            .catch(() => dispatch({ type: "setAuth", isAuth: false }))
    }, []);

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
    }, [client]);

    // We don't have a context in admin that we care about, so just load the page straight away
    if (!["/admin/global-sign-in"].includes(pathname) && !context) {
        return <LoadingPage />;
    }

    return (
        <Suspense fallback={<LoadingPage />}>
            {state._error && (
                <ErrorBlock text="An error occurred" />
            )}
            {!state.isAuth && (
                <ErrorBlock text="Go back to the admin settings form for the app and re-auth from there" />
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
