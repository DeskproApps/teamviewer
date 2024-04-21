import { useMemo } from "react";
import { match } from "ts-pattern";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import {
    LoadingSpinner,
    useDeskproElements,
    useDeskproAppClient,
    useDeskproAppEvents,
} from "@deskpro/app-sdk";
import {
    HomePage,
    LoadingAppPage,
    ViewSessionPage,
    GlobalSignInPage,
    CreateSessionPage,
} from "./pages";
import { useSession } from "./hooks";
import {
    isNavigatePayload,
    isInsertLinkPayload,
    isDeleteSessionPayload,
} from "./utils";
import type { EventPayload } from "./types";

const App = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { client } = useDeskproAppClient();
    const { isLoading, onDelete, onInsertLink } = useSession();
    const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);

    const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
        return match(payload.type)
            .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
            .with("insertLink", () => isInsertLinkPayload(payload) && onInsertLink(payload.link))
            .with("delete", () => isDeleteSessionPayload(payload) && onDelete(payload.code))
            .run();
    }, 500);

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onElementEvent: debounceElementEvent,
    }, [client]);

    useDeskproElements(({ registerElement }) => {
        registerElement("refresh", { type: "refresh_button" });
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Routes>
                <Route path="/admin/global-sign-in" element={<GlobalSignInPage/>}/>
                <Route path="/home" element={<HomePage/>} />
                <Route path="/sessions/create" element={<CreateSessionPage/>} />
                <Route path="/sessions/view/:code" element={<ViewSessionPage/>} />
                <Route index element={<LoadingAppPage />} />
            </Routes>
            {!isAdmin && (<><br/><br/><br/></>)}
        </>
    );
}

export { App };
