import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { preInstalledRequest } from "./preInstalledRequest";
import { Account, Settings } from "./types";

const getCurrentUserService = (
    client: IDeskproClient,
    params?: { settings: Settings },
    preInstalled = false,
) => {
    return (preInstalled && params)
        ? preInstalledRequest<Account>(client, { url: "/account", settings: params.settings })
        : baseRequest<Account>(client, { url: "/account" });
};

export { getCurrentUserService };
