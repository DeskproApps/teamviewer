import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import {
    pingService,
    refreshTokenService,
    refreshGlobalTokenService,
} from "../../services/teamviewer";
import { retryUntilResolve } from "../../utils";
import { useAsyncError } from "../../hooks";

const useCheckIsAuth = () => {
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();
    const retryPingService = retryUntilResolve(pingService, 3);

    useInitialisedDeskproAppClient((client) => {
        retryPingService(client)
            .catch(() => refreshTokenService(client))
            .catch(() => refreshGlobalTokenService(client))
            .then(() => pingService(client))
            .then(() => navigate("/home"))
            .catch(asyncErrorHandler);
    }, []);
};

export { useCheckIsAuth };
