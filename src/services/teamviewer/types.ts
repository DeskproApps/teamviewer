import { IDeskproClient, V2ProxyRequestInitBody } from "@deskpro/app-sdk";

/**  An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

export type Settings = {
    client_id?: string,
    client_secret?: string,
    global_access_token?: string,
};

export type AuthTokens = {
    accessToken: string,
    refreshToken: string,
};

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

export type TeamViewerAPIError = {
    error: string,
    error_code: number,
    error_description: string,
};

// V2ProxyRequestInit
export type FetchOptions = Pick<RequestParams, "method"|"headers"> & V2ProxyRequestInitBody;

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

export type SessionState = "Open" | "Closed";

export type SessionType = "Default" | "Pilot";

export type Session = {
    code: string,
    state: SessionState,
    assigned_userid: string,
    assigned_at: DateTime,
    created_at: DateTime,
    closed_at: DateTime,
    valid_until: DateTime,
    groupid: string,
    online: boolean,
    support_session_type: SessionType,
    end_customer_link: string,
    supporter_link: string,
};

export type UserMinimal = {
    id: string,
    name: string,
    email: string,
};
