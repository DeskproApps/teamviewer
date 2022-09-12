import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import every from "lodash/every";
import isEmpty from "lodash/isEmpty";
import {
    adminGenericProxyFetch,
    useDeskproAppClient,
    useDeskproAppEvents,
    useInitialisedDeskproAppClient
} from "@deskpro/app-sdk";
import { getQueryParams } from "../utils";
import { getCurrentUserService } from "../services/teamviewer";
import { Account, Settings, AuthTokens } from "../services/teamviewer/types";

export const useGlobalSignIn = () => {
    const { client } = useDeskproAppClient();
    const [ settings, setSettings ] = useState<Settings|null>(null);
    const [ callbackUrl, setCallbackUrl ] = useState<string|null>(null);
    const [ poll, setPoll ] = useState<(() => Promise<{ token: string }>)|null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isBlocking, setIsBlocking ] = useState<boolean>(true);
    const [ accessCode, setAccessCode ] = useState<string|null>(null);
    const [ user, setUser ] = useState<Account|null>(null);

    const key = useMemo(() => uuidv4(), []);

    const signOut = () => {
        client?.setAdminSetting("");
        setUser(null);
        setAccessCode(null);
    };

    const signIn = () => {
        poll && (async () => {
            setIsLoading(true);
            setAccessCode((await poll()).token)
        })();
    };

    useDeskproAppEvents({
        onAdminSettingsChange: setSettings,
    }, []);

    // Initialise OAuth flow
    useInitialisedDeskproAppClient((client) => {
        (async () => {
            const { callbackUrl, poll } = await client.oauth2().getAdminGenericCallbackUrl(
                key,
                /code=(?<token>[\d\w]+)/,
                /state=(?<key>.+)/
            );

            setCallbackUrl(callbackUrl);
            setPoll(() => poll);
        })();
    }, [key]);

    // Exchange auth code for auth/refresh tokens
    useInitialisedDeskproAppClient((client) => {
        const canRequestAccessToken = every([
            accessCode,
            callbackUrl,
            settings?.client_id,
            settings?.client_secret,
        ]);

        if (!canRequestAccessToken) {
            return;
        }

        const url = new URL(`https://webapi.teamviewer.com/api/v1/oauth2/token`);

        const requestOptions: RequestInit = {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: accessCode as string,
                client_id: settings?.client_id as string,
                client_secret: settings?.client_secret as string,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        (async () => {
            const fetch = await adminGenericProxyFetch(client);
            const response = await fetch(url.toString(), requestOptions);
            const data: {
                "access_token": string,
                "token_type": "bearer",
                "expires_in": number,
                "refresh_token": string,
            } = await response.json();

            const tokens: AuthTokens = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
            };

            client.setAdminSetting(JSON.stringify(tokens));

            setIsLoading(false);
        })();
    }, [
        accessCode,
        callbackUrl,
        settings?.client_id,
        settings?.client_secret,
    ]);

    // Get current TeamViewer user
    useInitialisedDeskproAppClient((client) => {
        if (!isEmpty(settings)) {
            getCurrentUserService(client, { settings }, true)
                .then(setUser)
                .catch(signOut)
        }
    }, [settings?.global_access_token]);

    // Build auth flow entrypoint URL
    const oAuthUrl = useMemo(() => {
        if (!settings?.client_id) {
            return null;
        }

        return `https://login.teamviewer.com/oauth2/authorize?${getQueryParams({
            response_type: "code",
            display: "popup",
            client_id: settings.client_id,
            state: key,
            redirect_uri: callbackUrl,
        })}`;
    }, [settings?.client_id, callbackUrl, key]);

    // Set blocking flag
    useEffect(() => {
        if (!(callbackUrl && client && poll)) {
            setIsBlocking(true);
        } else if (settings?.global_access_token && !user) {
            setIsBlocking(true);
        } else {
            setIsBlocking(false);
        }
    }, [callbackUrl, client, poll, settings?.global_access_token, user]);

    const cancelLoading = () => setIsLoading(false);

    return {
        callbackUrl,
        user,
        oAuthUrl,
        isLoading,
        isBlocking,
        cancelLoading,
        signIn,
        signOut,
    };
};
