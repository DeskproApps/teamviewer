import type { IDeskproClient, V2ProxyRequestInitBody } from "@deskpro/app-sdk";

/** Common types */
export type Maybe<T> = T | undefined | null;

/**  An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT";

export type RequestParams = {
    url?: string,
    rawUrl?: string,
    checkXStatus?: boolean,
    method?: ApiRequestMethod,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>,
    headers?: Record<string, string>,
    queryParams?: Record<string, string|number|boolean>,
};

export type PreRequestParams = {
    url: string,
    settings: Settings,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>|RequestInit["body"]|V2ProxyRequestInitBody["body"]
    method?: ApiRequestMethod,
};

export type PreInstalledRequest = <T>(
    client: IDeskproClient,
    params: PreRequestParams,
) => Promise<T>;

// V2ProxyRequestInit
export type FetchOptions = Pick<RequestParams, "method"|"headers"> & V2ProxyRequestInitBody;

export type Request = <T>(
    client: IDeskproClient,
    params: RequestParams
) => Promise<T>;

/** Deskpro types */
export type Settings = {
    client_id?: string,
    client_secret?: string,
    global_access_token?: string,
};
