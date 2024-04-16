import { Routes, Route, useLocation } from "react-router-dom";
import {
    LoadingSpinner,
    useDeskproAppClient,
    useDeskproAppEvents,
    useDeskproLatestAppContext,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { HomePage, GlobalSignInPage, LoadingAppPage } from "./pages";

const App = () => {
    const { context } = useDeskproLatestAppContext();
    const { client } = useDeskproAppClient();
    const location = useLocation();
    const { pathname } = location;

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
        <Routes>
            <Route path="/">
                <Route path="admin/global-sign-in" element={<GlobalSignInPage/>}/>
                <Route path="/home" element={<HomePage/>} />
                <Route index element={<LoadingAppPage />} />
            </Route>
        </Routes>
    );
}

export { App };
