import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LoadingSpinner,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
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

    useInitialisedDeskproAppClient((client) => {
        refreshTokenService(client)
            .catch(() => {
                return refreshGlobalTokenService(client)
                    .then(({ access_token, refresh_token }) => Promise.all([
                        client.setState("oauth/global/access_token", access_token, { backend: true }),
                        client.setState("oauth/global/refresh_token", refresh_token, { backend: true }),
                    ]))
            })
            .then(() => pingService(client))
            .then(() => {
                dispatch({ type: "setAuth", isAuth: true });
                navigate("/home");
            })
            .catch(() => setError("Go back to the admin settings form for the app and re-auth from there"))
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
