import type { To } from "react-router-dom";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

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
    data?: Record<string, any>|RequestInit["body"],
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

/** Deskpro types */
export type Settings = {
    client_id?: string,
    client_secret?: string,
    global_access_token?: string,
};

export type DPUser = {
    id: string,
    email: string,
    emails: string[],
    firstName: string,
    lastName: string,
    displayName: string,
    language: string,
    locale: string,
    phoneNumbers: string[],
    primaryOrgMember: {
        position: string,
        isManager: boolean,
        organization: { id: string, name: string },
    },
    "orgMembers": Array<{
        position: string,
        isManager: boolean,
        organization: { id: string, name: string }
    }>,
    contacts: [],
    customFields: object
};

export type TicketData = {
    ticket: {
        id: string,
        permalinkUrl: string,
        subject: string,
        status: string,
        creationSystem: string,
        emailAccountAddress: string,
        receivedEmailAccountAddress: string,
        primaryUser: DPUser,
        followers: DPUser[],
        organization: object,
        attachments: [],
        customFields: object,
        billingCharges: [],
        team: { id: string, name: string },
        ref: string,
        labels: [],
        department: { id: string, name: string },
        urgency: 9,
        agent: DPUser,
        ccs: [],
        createdAt: DateTime,
        lastUserReplyAt: DateTime,
        statusChangedAt: DateTime
    },
    app: object,
    env: object,
    currentAgent: object,
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type InsertLinkPayload = { type: "insertLink", link: string };

export type DeleteSessionPayload = { type: "delete", code: string };

export type EventPayload =
    | NavigateToChangePage
    | InsertLinkPayload
    | DeleteSessionPayload
;
