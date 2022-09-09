import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import {
    AnchorButton,
    AnchorButtonProps,
} from "@deskpro/deskpro-ui";
import {
    OAuth2CallbackUrl,
    useDeskproAppClient,
    useDeskproOAuth2Auth,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { getQueryParams } from "../utils";

const LoginButton: FC<AnchorButtonProps> = styled(AnchorButton)`
    min-width: 72px;
    justify-content: center;
`;

const BASE_URL = "https://webapi.teamviewer.com/api/v1/";
                 // "https://webapi.teamviewer.com/api/v1/oauth2/authorize"

const LogInPage: FC = () => {
    const { client } = useDeskproAppClient();
    const [state, dispatch] = useStore();
    const { callback: initCallback } = useDeskproOAuth2Auth("code", /code=(?<token>[0-9a-f]+)$/);
    const [callback, setCallback] = useState<OAuth2CallbackUrl|undefined>(initCallback);
    const [authUrl, setAuthUrl] = useState<string|null>(null);
    const callbackUrl = callback?.callbackUrl;
    const clientId =  state?.context?.settings?.client_id;

    useEffect(() => {
        if (!callback) {
            client?.oauth2()
                .getCallbackUrl("code", /code=(?<token>[0-9a-f]+)$/)
                .then((callback: OAuth2CallbackUrl) => setCallback(callback));
        }
    }, [initCallback]);

    useEffect(() => {
        if (callbackUrl && clientId) {
            // setAuthUrl(`https://login.teamviewer.com/oauth2/authorize?${getQueryParams({
            setAuthUrl(`${BASE_URL}/oauth2/authorize?${getQueryParams({
                response_type: "code",
                display: "popup",
                client_id: clientId,
                redirect_uri: callbackUrl,
            })}`);
        } else {
            setAuthUrl(null);
        }
    }, [callbackUrl, clientId]);

    const onSignIn = () => {
        if (!callback || !client) {
            return;
        }

        callback.poll()
            .then((data) => {
                console.log(">>> onSignIn:then:", data);
            })
    }

    return (
        <>
            <LoginButton
                text="Log In"
                target="_blank"
                href={authUrl || ""}
                onClick={onSignIn}
            />
        </>
    );
};

export { LogInPage };
