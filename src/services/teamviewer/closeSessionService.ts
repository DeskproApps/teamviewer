import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { Session } from "./types";

const closeSessionService = (client: IDeskproClient, code: Session["code"]) => {
    return baseRequest(client, {
        url: `/sessions/${code}`,
        method: "PUT",
        data: { state: "closed" },
    })
};

export { closeSessionService };
