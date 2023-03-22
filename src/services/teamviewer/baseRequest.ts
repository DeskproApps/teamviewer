import isEmpty from "lodash/isEmpty";
import { proxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "./constants";
import { Request } from "./types";
import { getQueryParams } from "../../utils";
import { refreshTokenService } from "./refreshTokenService";

const baseRequest: Request = async (client, {
    url,
    rawUrl,
    data = {},
    method = "GET",
    queryParams = {},
    headers: customHeaders,
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
        headers["Authorization"] = `Bearer ${placeholders.ACCESS_TOKEN}`;
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
        await refreshTokenService(client);

        res = await dpFetch(requestUrl, {
            method,
            body,
            headers: {
                ...headers,
                ...customHeaders,
                "Authorization": `Bearer ${placeholders.ACCESS_TOKEN}`,
            },
        });
    }

    if (res.status === 400) {
        const badReqResponse = await res.text();
        try {
            return JSON.parse(badReqResponse);
        } catch (e) {
            return badReqResponse;
        }
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
