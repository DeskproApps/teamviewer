import { FC, useEffect, useCallback } from "react";
import {
    H1,
    Button,
    HorizontalDivider,
    useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import {getSessionsService, createSessionService, getCurrentUserService} from "../services/teamviewer";
import { BaseContainer } from "../components/common";

const HomePage: FC = () => {
    console.log(">>> home:");
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();

    useEffect(() => {
        if (!client || !state.isAuth) {
            return;
        }

        getCurrentUserService(client)
            .then((user) => {
                console.log(">>> mount:user:then:", user);
                return getSessionsService(client)
            })
            .then((sessions) => {
                console.log(">>> mount:sessions:then:", sessions);
            })
            .catch((err) => {
                console.log(">>> mount:catch:", err);
            })
    }, [client, state.isAuth]);

    const onCreateSession = useCallback(() => {
        if (!client) { return }
        console.log(">>> onCreateSession:");
        createSessionService(client)
            .then((data) => {
                console.log(">>> onCreateSession:then:", data);
            })
            .catch((err) => {
                console.log(">>> onCreateSession:catch:");
                console.dir(err);
            })
    }, [client]);

    return (
        <BaseContainer>
            <H1>Active Sessions (0)</H1>
            <Button text="Create New Session" onClick={onCreateSession} intent="secondary" />
            <HorizontalDivider/>
            <H1>Expired Sessions (0)</H1>
        </BaseContainer>
    );
};

export { HomePage };
