import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LoadingSpinner,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { retryUntilResolve } from "../utils";
import { AUTH_ERROR } from "../constants";
import {
    pingService,
    refreshTokenService,
    refreshGlobalTokenService,
} from "../services/teamviewer";
import { BaseContainer, ErrorBlock } from "../components/common";

const useCheckIsAuth = () => {
    const navigate = useNavigate();
    const [, dispatch] = useStore();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    const retryPingService = retryUntilResolve(pingService, 3);

    useInitialisedDeskproAppClient((client) => {
        retryPingService(client)
            .catch(() => refreshTokenService(client))
            .catch(() => refreshGlobalTokenService(client))
            .then(() => pingService(client))
            .then(() => {
                dispatch({ type: "setAuth", isAuth: true });
                navigate("/home");
            })
            .catch(() => setError(AUTH_ERROR))
            .finally(() => setIsLoading(false));
    }, []);

    return { isLoading, error };
};

const LoadingAppPage = () => {
    const { isLoading, error } = useCheckIsAuth();

    if (isLoading) {
        return (
            <LoadingSpinner/>
        );
    }

    return (
        <BaseContainer>
            {error && (
                <ErrorBlock text={error} />
            )}
        </BaseContainer>
    );
}

export { LoadingAppPage };
