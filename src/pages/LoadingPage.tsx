import { useNavigate } from "react-router-dom";
import {
    LoadingSpinner,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { pingService, refreshTokenService } from "../services/teamviewer";

const LoadingPage = () => {
    const navigate = useNavigate();
    const [, dispatch] = useStore();

    useInitialisedDeskproAppClient((client) => {
        (async () => {
            try {
                const { token_valid } = await pingService(client);

                if (token_valid) {
                    dispatch({ type: "setAuth", isAuth: token_valid })
                    token_valid && navigate("/home");
                    return;
                }

                await refreshTokenService(client);

                dispatch({ type: "setAuth", isAuth: true });
                navigate("/home");
            } catch (e) {
                dispatch({ type: "setAuth", isAuth: false })
            }
        })();
    }, []);

    return (
        <LoadingSpinner/>
    );
}

export { LoadingPage };
