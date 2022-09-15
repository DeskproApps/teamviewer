import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";

const getSessionsService = (client: IDeskproClient) => {
    return baseRequest(client, { url: "/sessions", method: "GET" })
};

export { getSessionsService };
