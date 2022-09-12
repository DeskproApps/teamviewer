import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";

const pingService = (client: IDeskproClient) => {
    return baseRequest<{ token_valid: boolean }>(client, { url: "/ping", method: "GET" })
};

export { pingService };
