import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session, SessionInput } from "./types";

const createSessionService = (client: IDeskproClient, data: SessionInput) => {
    // This response contains the new session URLs decoded from the Location header
    return baseRequest<Session>(client, {
        url: "/sessions",
        method: "POST",
        data,
        headers: {
            "X-Proxy-Redirect-As-Success": "1"
        },
    });
};

export { createSessionService };
