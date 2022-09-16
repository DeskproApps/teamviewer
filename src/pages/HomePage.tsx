import { FC, useState, useEffect, useCallback } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
    H3,
    Stack,
    Button,
    HorizontalDivider,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getSessionsService, closeSessionService } from "../services/teamviewer";
import {
    Title,
    TwoColumn,
    BaseContainer,
    TeamViewerLink,
    TextBlockWithLabel,
} from "../components/common";
import { LoadingPage } from "./LoadingPage";
import { getDate, isExpired } from "../utils/date";
import { Session } from "../services/teamviewer/types";

type SessionTitleProps = {
    title: Session["code"],
    link?: Session["end_customer_link"],
};

const SessionTitle = ({ title, link }: SessionTitleProps) => (
    <Stack gap={6} align="center" justify="space-between" style={{ marginBottom: "7px", width: "100%" }}>
        <H3>{title}</H3>
        {link && (<TeamViewerLink href={link}/>)}
    </Stack>
);

type ActiveSessionsProps = {
    sessions: Session[],
    onCreate: () => void,
    onDelete: (code: Session["code"]) => void,
};

const ActiveSessions = ({ sessions, onCreate, onDelete }: ActiveSessionsProps) => (
    <>
        <Title>
            Active Sessions ({sessions.length})&nbsp;
            {sessions.length > 0 && (
                <Button icon={faPlus} minimal noMinimalUnderline onClick={onCreate} />
            )}
        </Title>

        {sessions.map(({ code, created_at, end_customer_link }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <SessionTitle title={code} link={end_customer_link} />
                <TextBlockWithLabel label="Created" text={getDate(created_at)} />
                <Stack justify="space-between" style={{ width: "100%", marginBottom: "14px" }}>
                    {/*<Button text="Insert Link" intent="secondary" />*/}
                    <Button text="Delete" intent="secondary" onClick={() => onDelete(code)} />
                </Stack>
                <HorizontalDivider style={{ width: "100%" }}/>
            </Stack>
        ))}

        {sessions.length === 0 && (
            <>
                <Button text="Create New Session" onClick={onCreate} intent="secondary" />
                <HorizontalDivider style={{ width: "100%", margin: "15px 0" }}/>
            </>
        )}
    </>
);

const ExpiredSessions = ({ sessions }: { sessions: Session[] }) => (
    <>
        <Title>Expired Sessions ({sessions.length})</Title>
        {sessions.map(({ code, created_at, valid_until }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <SessionTitle title={code} />
                <TwoColumn
                    leftLabel="Created"
                    leftText={getDate(created_at)}
                    rightLabel="Expired"
                    rightText={getDate(valid_until)}
                />
                <HorizontalDivider style={{ width: "100%" }}/>
            </Stack>
        ))}
    </>
);

const HomePage: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const [loading, setLoading] = useState<boolean>(false);
    const [activeSessions, setActiveSessions] = useState<Session[]>([]);
    const [expiredSessions, setExpiredSessions] = useState<Session[]>([]);

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
    }, [client]);

    const onDelete = useCallback((code) => {
        if (!client) { return }

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
            <ActiveSessions sessions={activeSessions} onCreate={onCreate} onDelete={onDelete} />
            <ExpiredSessions sessions={expiredSessions} />
        </BaseContainer>
    );
};

export { HomePage };
