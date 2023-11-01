import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";

const pingService = (client: IDeskproClient): Promise<void> => {
    return baseRequest<{ token_valid: boolean }>(client, { url: "/ping" })
        .then(({ token_valid }) => token_valid ? Promise.resolve() : Promise.reject());
};

export { pingService };
