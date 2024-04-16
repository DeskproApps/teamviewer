import { FC, useState, useCallback } from "react";
import { isString } from "lodash";
import {
    LoadingSpinner,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { closeSessionService, createSessionService } from "../../services/teamviewer";
import { useAsyncError } from "../../hooks";
import { useSessions } from "./hooks";
import { queryClient } from "../../query";
import { RATE_LIMIT_ERROR } from "../../constants";
import { Home } from "../../components";
import type { Maybe } from "../../types";
import type { Session } from "../../services/teamviewer/types";

const HomePage: FC = () => {
    const { client } = useDeskproAppClient();
    const { asyncErrorHandler } = useAsyncError();
    const {
        activeSessions,
        expiredSessions,
        isLoading: isLoadingSessions,
    } = useSessions();
    const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
    const [rateLimitError, setRateLimitError] = useState<Maybe<string>>(null);
    const isLoading = isLoadingSessions || isLoadingCreate;

    const onCreate = useCallback(() => {
        if (!client) {
            return;
        }

        setIsLoadingCreate(true);
        setRateLimitError(null);

        createSessionService(client)
            .then((res) => {
                if (isString(res) && `${res}`.includes("license limitations")) {
                    setRateLimitError(RATE_LIMIT_ERROR);
                }
                return;
            })
            .then(() => queryClient.invalidateQueries())
            .catch(asyncErrorHandler)
            .finally(() => setIsLoadingCreate(false));
    }, [client, asyncErrorHandler]);

    const onDelete = useCallback((code: Session["code"]) => {
        if (!client) { return }

        setRateLimitError(null);
        setIsLoadingCreate(true);

        closeSessionService(client, code)
            .then(() => queryClient.invalidateQueries())
            .catch(asyncErrorHandler)
            .finally(() => setIsLoadingCreate(false))
    }, [client, asyncErrorHandler]);

    const onInsertLink = useCallback((sessionLink: Session["end_customer_link"]) => {
        client?.deskpro().appendLinkToActiveTicketReplyBox(sessionLink, sessionLink);
    }, [client]);

    if (isLoading) {
        return (<LoadingSpinner />);
    }

    return (
        <Home
            onCreate={onCreate}
            onDelete={onDelete}
            onInsertLink={onInsertLink}
            rateLimitError={rateLimitError}
            activeSessions={activeSessions}
            expiredSessions={expiredSessions}
        />
    );
};

export { HomePage };
