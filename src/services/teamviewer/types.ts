import type { DateTime } from "../../types";

export type AuthTokens = {
    accessToken: string,
    refreshToken: string,
};

export type TeamViewerAPIError = {
    error: string,
    error_code: number,
    error_description: string,
};

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
