import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const createSessionService = (client: IDeskproClient) => {
    // This response conatins the new session URLs decoded from the Location header
    return baseRequest<Session>(client, {
        url: "/sessions",
        method: "POST",
        data: { groupname: "Deskpro" },
        headers: {
            "X-Proxy-Redirect-As-Success": "1"
        },
    });
};

export { createSessionService };
