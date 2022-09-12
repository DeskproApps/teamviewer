import { IDeskproClient } from "@deskpro/app-sdk";

export type Settings = {
    client_id?: string,
    client_secret?: string,
    global_access_token?: string,
};

export type AuthTokens = {
    accessToken: string,
    refreshToken: string,
};

export type ApiRequestMethod = "GET" | "POST";

export type RequestParams = {
    url?: string,
    rawUrl?: string,
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
    data?: Record<string, any>,
    method?: ApiRequestMethod,
};

export type PreInstalledRequest = <T>(
    client: IDeskproClient,
    params: PreRequestParams,
) => Promise<T>;

export type Request = <T>(
    client: IDeskproClient,
    params: RequestParams
) => Promise<T>;

export type Account = {
    userid: string,
    name: string,
    email: string,
    company_name?: string,
    email_validated?: boolean,
    mail_language?: string,
};
