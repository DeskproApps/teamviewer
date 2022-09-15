import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";

const createSessionService = (client: IDeskproClient) => {
    return baseRequest(client, { url: "/sessions", method: "POST", data: { groupname: "Deskpro" } })
};

export { createSessionService };
