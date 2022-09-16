import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const createSessionService = (client: IDeskproClient) => {
    return baseRequest<Session>(client, {
        url: "/sessions",
        method: "POST",
        data: { groupname: "Deskpro" },
        headers: {
            "X-Proxy-Redirect-As-Success": "1"
        },
    })
};

export { createSessionService };
