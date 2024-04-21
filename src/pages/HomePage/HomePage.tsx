import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSession, useRegisterElements } from "../../hooks";
import { useSessions } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
    const navigate = useNavigate();
    const { isLoading: isLoadingSession, onDelete, onInsertLink } = useSession();
    const {
        activeSessions,
        expiredSessions,
        isLoading: isLoadingSessions,
    } = useSessions();
    const isLoading = isLoadingSessions || isLoadingSession;

    const onNavigateToCreate = useCallback(() => navigate("/sessions/create"), [navigate]);

    useRegisterElements();

    if (isLoading) {
        return (<LoadingSpinner />);
    }

    return (
        <Home
            onDelete={onDelete}
            onInsertLink={onInsertLink}
            activeSessions={activeSessions}
            expiredSessions={expiredSessions}
            onNavigateToCreate={onNavigateToCreate}
        />
    );
};

export { HomePage };
