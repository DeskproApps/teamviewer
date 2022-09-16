import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { UserMinimal } from "./types";

const getUsersService = (client: IDeskproClient) => {
    return baseRequest<{ users: UserMinimal[] }>(client, { url: "/users" });
};

export { getUsersService };
