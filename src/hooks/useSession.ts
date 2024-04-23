import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryWithClient, useDeskproAppClient } from "@deskpro/app-sdk";
import { getSessionService, closeSessionService } from "../services/teamviewer";
import { useAsyncError } from "../hooks";
import { queryClient, QueryKey } from "../query";
import type { Session } from "../services/teamviewer/types";

type UseSession = (code?: Session["code"]) => {
    isLoading: boolean,
    session: Session,
    onDelete: (code: Session["code"]) => void;
    onInsertLink: (sessionLink: Session["end_customer_link"]) => void;
};

const useSession: UseSession = (code) => {
    const navigate = useNavigate();
    const { client } = useDeskproAppClient();
    const { asyncErrorHandler } = useAsyncError();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onInsertLink = useCallback((sessionLink: Session["end_customer_link"]) => {
        if (!client) {
            return;
        }

        setIsLoading(true);

        return client.deskpro()
            .appendLinkToActiveTicketReplyBox(sessionLink, sessionLink)
            .finally(() => setIsLoading(false));
    }, [client]);

    const onDelete = useCallback((code: Session["code"]) => {
        if (!client || !code) {
            return;
        }

        setIsLoading(true);

        return closeSessionService(client, code)
            .then(() => queryClient.invalidateQueries())
            .then(() => navigate("/home"))
            .catch(asyncErrorHandler)
            .finally(() => setIsLoading(false))
    }, [client, navigate, asyncErrorHandler]);

    const session = useQueryWithClient(
        [QueryKey.SESSION, code as Session["code"]],
        (client) => getSessionService(client, code as Session["code"]),
        { enabled: Boolean(code) }
    );

    return {
        isLoading: isLoading || session.isLoading && Boolean(code),
        session: session.data as Session,
        onInsertLink,
        onDelete,
    };
};

export { useSession };
