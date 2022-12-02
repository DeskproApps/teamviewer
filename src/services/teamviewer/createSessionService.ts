import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const createSessionService = (client: IDeskproClient) => {
    const createSessionResponse = baseRequest<Session>(client, {
        url: "/sessions",
        method: "POST",
        data: { groupname: "Deskpro" },
        headers: {
            "X-Proxy-Redirect-As-Success": "1"
        },
    });

    // This response conatins the new session URLs decoded from the Location header
    return createSessionResponse;
};

export { createSessionService };
