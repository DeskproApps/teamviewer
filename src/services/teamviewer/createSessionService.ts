import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const createSessionService = (client: IDeskproClient) => {
    return baseRequest<Session>(client, {
        url: "/sessions",
        method: "POST",
        data: { groupname: "Deskpro" },
    })
};

export { createSessionService };
