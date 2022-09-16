import { Reducer } from "react";
import { Context } from "@deskpro/app-sdk";
import { Session } from "../../services/teamviewer/types";

export type ErrorType = Error | string | unknown;

export type Page =
    | "home"
    | "log_in"
    | null;

export type PageParams = {
    //...
};

export interface State {
    page?: Page;
    pageParams?: PageParams,
    context?: Context,
    isAuth: boolean,
    sessions?: Session[],
    //...
    _error?: ErrorType,
}

export type Action =
    | { type: "changePage", page: Page, params?: PageParams }
    | { type: "loadContext", context: Context }
    | { type: "error", error: ErrorType }
    | { type: "setAuth", isAuth: boolean }
    | { type: "setSessions", sessions: Session[] };

export type Dispatch = (action: Action) => void;

export type StoreReducer = Reducer<State, Action>;

export type AppElementPayload =
    | { type: "logout" }
    | { type: "changePage", page: Page, params?: PageParams };
