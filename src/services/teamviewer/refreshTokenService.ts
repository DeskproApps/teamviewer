import { proxyFetch, IDeskproClient } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";

type SuccessRefresh = {
    token_type: "bearer",
    access_token: string,
    refresh_token: string,
    expires_in: number,
};

const refreshTokenService = async (
    client: IDeskproClient,
): Promise<SuccessRefresh> => {
    let res;
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: [
            `grant_type=refresh_token`,
            `client_id=__client_id__`,
            `client_secret=__client_secret__`,
            `refresh_token=${placeholders.REFRESH_TOKEN}`,
        ].join("&")
    };

    const dpFetch = await proxyFetch(client);

    res = await dpFetch(`${BASE_URL}/oauth2/token`, options);

    if (res.status !== 200) {
        options.body = [
            `grant_type=refresh_token`,
            `client_id=__client_id__`,
            `client_secret=__client_secret__`,
            `refresh_token=${placeholders.GLOBAL_REFRESH_TOKEN}`,
        ].join("&");

        res = await dpFetch(`${BASE_URL}/oauth2/token`, options);
    }

    if (res.status !== 200) {
        throw new Error(await res.text());
    }

    const tokens = await res.json();

    await client.setState("oauth/global/access_token", tokens.access_token, { backend: true });
    await client.setState("oauth/global/refresh_token", tokens.refresh_token, { backend: true });

    return tokens;
};

export { refreshTokenService };
