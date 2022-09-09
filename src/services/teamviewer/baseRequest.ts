import isEmpty from "lodash/isEmpty";
import { proxyFetch, IDeskproClient } from "@deskpro/app-sdk";
import { getQueryParams } from "../../utils";

type ApiRequestMethod = "GET" | "POST";

type RequestParams = {
    url?: string,
    rawUrl?: string,
    method?: ApiRequestMethod,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    headers?: Record<string, string>,
    queryParams?: Record<string, string|number|boolean>,
};

type Request = <T>(
    client: IDeskproClient,
    params: RequestParams
) => Promise<T>;

const placeholders = {
    CLIENT_ID: "__client_id__",
    CLIENT_SECRET: "__client_secret__",
    TOKEN: `[user[oauth2/token]]`,
    // CODE_PATH: "oauth2/code",
    // CODE: "[user[oauth2/code]]",
    // OAUTH_TOKEN_PATH: "oauth2/token",
};

const BASE_URL = "https://api.github.com";

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
        headers["Accept"] = "application/vnd.github+json";
        headers["Content-Type"] = "application/json";
        // headers["Authorization"] = `token ${placeholders.TOKEN}`;
    }

    const res = await dpFetch(requestUrl, {
        method,
        body,
        headers: {
            ...headers,
            ...customHeaders,
        },
    });

    if (res.status === 400) {
        return res.json();
    }

    if (res.status < 200 || res.status >= 400) {
        throw new Error(`${method} ${url}: Response Status [${res.status}]`);
    }

    try {
        return await res.json();
    } catch (e) {
        return {};
    }
};

export { baseRequest };
