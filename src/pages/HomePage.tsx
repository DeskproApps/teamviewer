import { FC, useState, useEffect, useCallback } from "react";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import {
    getSessionsService,
    closeSessionService,
    createSessionService,
} from "../services/teamviewer";
import { BaseContainer, ErrorBlock } from "../components/common";
import { ActiveSessions } from "../components/ActiveSessions";
import { ExpiredSessions } from "../components/ExpiredSessions";
import { LoadingPage } from "./LoadingPage";
import { isExpired } from "../utils/date";
import { Session } from "../services/teamviewer/types";

const HomePage: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [activeSessions, setActiveSessions] = useState<Session[]>([]);
    const [expiredSessions, setExpiredSessions] = useState<Session[]>([]);
    const [rateLimitError, setRateLimitError] = useState<string|null>(null);

    useEffect(() => {
        if (!client || !state.isAuth) {
            return;
        }

        setLoading(true);

        getSessionsService(client)
            .then(({ sessions }) => dispatch({ type: "setSessions", sessions }))
            .catch((error) => dispatch({ type: "error", error }))
            .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, state.isAuth]);

    useEffect(() => {
        const newActiveSessions: Session[] = [];
        const newExpiredSessions: Session[] = [];

        if (Array.isArray(state.sessions)) {
            state.sessions.forEach((session: Session) => {
                if (isExpired(session.valid_until)) {
                    newExpiredSessions.push(session)
                } else {
                    newActiveSessions.push(session);
                }
            })
        }

        setActiveSessions(newActiveSessions);
        setExpiredSessions(newExpiredSessions);
    }, [state.sessions]);

    const onCreate = useCallback(() => {
        if (!client) { return }

        setLoading(true);
        setRateLimitError(null);

        (async () => {
            try {
                const createRes = await createSessionService(client);

                if (typeof createRes === "string" && `${createRes}`.includes("license limitations")) {
                    setRateLimitError("You have reached the maximum number of concurrent sessions permitted by your TeamViewer license");
                    return;
                }

                const data = await getSessionsService(client);

                dispatch({ type: "setSessions", sessions: data.sessions });
            } catch (err) {
                dispatch({ type: "error", error: err });
            } finally {
                setLoading(false);
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client]);

    const onDelete = useCallback((code) => {
        if (!client) { return }

        setRateLimitError(null);

        dispatch({ type: "error", error: null });
        setLoading(true);
        closeSessionService(client, code)
            .then(() => getSessionsService(client))
            .then(({ sessions }) => dispatch({ type: "setSessions", sessions }))
            .catch((error) => dispatch({ type: "error", error }))
            .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client]);

    if (loading) {
        return (<LoadingPage />);
    }

    return (
        <BaseContainer>
            {rateLimitError && <ErrorBlock text={rateLimitError} />}
            <ActiveSessions
                sessions={activeSessions}
                onCreate={onCreate}
                onDelete={onDelete}
            />
            <ExpiredSessions sessions={expiredSessions} />
        </BaseContainer>
    );
};

export { HomePage };
