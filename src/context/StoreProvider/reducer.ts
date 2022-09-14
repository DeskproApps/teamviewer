import { P, match } from "ts-pattern";
import { State, Action, StoreReducer } from "./types";

export const initialState: State = {
    isAuth: true,
    _error: undefined,
};

export const reducer: StoreReducer = (state: State, action: Action): State => {
    return match<[State, Action]>([state, action])
        .with([P._, { type: "changePage" }], ([prevState, action]) => ({
            ...prevState,
            page: action.page,
            pageParams: action.params,
        }))
        .with([P._, { type: "loadContext" }], ([prevState, action]) => ({
            ...prevState,
            context: action.context,
        }))
        .with([P._, { type: "error" }], ([prevState, action]) => ({
            ...prevState,
            _error: action.error,
        }))
        .with([P._, { type: "setAuth" }], ([prevState, action]) => ({
            ...prevState,
            isAuth: action.isAuth,
        }))
        .otherwise(() => state);
};

