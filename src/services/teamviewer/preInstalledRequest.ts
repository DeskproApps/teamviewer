import { IDeskproClient, adminGenericProxyFetch } from "@deskpro/app-sdk";
import every from "lodash/every";
import { BASE_URL } from "./constants";
import type { ProxyResponse } from "@deskpro/app-sdk";
import { AuthTokens, PreInstalledRequest, FetchOptions } from "./types";

export const isResponseError = (response: ProxyResponse) => (response.status < 200 || response.status >= 400);

const preInstalledRequest: PreInstalledRequest = async (
    client: IDeskproClient,
    { url, data = {}, method = "GET", settings },
) => {
    if (!every([settings?.client_id, settings?.client_secret, settings?.global_access_token])) {
        throw new Error("Client id, secret or global access tokens are not defined");
    }

    const baseUrl = `${BASE_URL}${url}`;
    const tokens: AuthTokens = JSON.parse(settings.global_access_token as string);

    const fetch = await adminGenericProxyFetch(client);

    const options: FetchOptions = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${tokens.accessToken}`,
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    let response = await fetch(baseUrl, options);

    if ([400, 401].includes(response.status)) {
        const preRequestOptions: FetchOptions = {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: tokens.refreshToken,
                client_id: settings.client_id as string,
                client_secret: settings.client_secret as string,
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        const refreshResponse = await fetch(new URL(`${BASE_URL}/oauth2/token`).toString(), preRequestOptions);

        if (isResponseError(response)) {
            throw new Error(`Request failed: [${response.status}] ${await response.text()}`);
        }

        const refreshData = await refreshResponse.json();

        const refreshedTokens: AuthTokens = {
            ...tokens,
            accessToken: refreshData.access_token,
        };

        const refreshedTokensEncoded = JSON.stringify(refreshedTokens);

        await client.setSetting("global_access_token", refreshedTokensEncoded);

        client?.setAdminSetting(refreshedTokensEncoded);
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${refreshedTokens.accessToken}`,
        };

        response = await fetch(baseUrl, options);
    }

    if (isResponseError(response)) {
        throw new Error(`Request failed: [${response.status}] ${await response.text()}`);
    }

    return response.json();
};

export { preInstalledRequest };
