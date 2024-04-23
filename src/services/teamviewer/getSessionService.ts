import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const getSessionService = (client: IDeskproClient, code: Session["code"]) => {
    return baseRequest<Session>(client, {
        url: `/sessions/${code}`,
    });
};

export { getSessionService };
