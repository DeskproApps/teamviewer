import isEmpty from "lodash/isEmpty";
import { proxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import { Request } from "./types";
import { getQueryParams } from "../../utils";

const baseRequest: Request = async (client, {
    url,
    rawUrl,
    data = {},
    method = "GET",
    queryParams = {},
    headers: customHeaders
}) => {
    const dpFetch = await proxyFetch(client);

    let body = undefined;
    const headers: Record<string, string> = {};

    const baseUrl = `${rawUrl ? rawUrl : `${BASE_URL}${url}`}`;
    const params = `${isEmpty(queryParams) ? "" : `?${getQueryParams(queryParams, true)}`}`;
    const requestUrl = `${baseUrl}${params}`;

    if (data instanceof FormData) {
        body = data;
    } else if(data) {
        body = JSON.stringify(data);
    }

    if (body instanceof FormData) {
        //...
    } else if (data) {
        headers["Content-Type"] = "application/json";
        headers["Authorization"] = `Bearer ${placeholders.GLOBAL_ACCESS_TOKEN}`;
    }

    let res = await dpFetch(requestUrl, {
        method,
        body,
        headers: {
            ...headers,
            ...customHeaders,
        },
    });

    if ([400, 401].includes(res.status)) {
        const preRequestOptions: RequestInit = {
            method: "POST",
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: `__global_access_token.json("[refreshToken]")__`,
                client_id: "__client_id__",
                client_secret: "__client_secret__",
            }),
            headers: {
                ...headers,
                ...customHeaders,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        const refreshResponse = await fetch(new URL(`${BASE_URL}/oauth2/token`).toString(), preRequestOptions);
        const refreshData = await refreshResponse.json();

        await client.setState<string>("oauth/global/accesstoken", refreshData.access_token, {
            backend: true,
        });

        res = await dpFetch(requestUrl, {
            method,
            body,
            headers: {
                ...headers,
                ...customHeaders,
                "Authorization": `Bearer [[oauth/global/accesstoken]]`,
            },
        });
    }

    if (res.status === 400) {
        return res.json();
    }

    if (res.status < 200 || res.status >= 400) {
        throw new Error(`Request failed: [${res.status}] ${await res.text()}`);
    }

    try {
        return await res.json();
    } catch (e) {
        return {};
    }
};

export { baseRequest };
