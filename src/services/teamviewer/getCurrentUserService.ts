import { IDeskproClient } from "@deskpro/app-sdk";
import { baseRequest } from "./baseRequest";
import { preInstalledRequest } from "./preInstalledRequest";
import type { Settings } from "../../types";
import type { Account } from "./types";

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
