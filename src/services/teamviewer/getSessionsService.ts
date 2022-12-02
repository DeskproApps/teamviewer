import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const getSessionsService = (client: IDeskproClient) => {
    return baseRequest<{ sessions: Session[] }>(client, {
        url: "/sessions",
        queryParams: { full_list: true, state: "open" },
    });
};

export { getSessionsService };
