import { match } from "ts-pattern";
import {
    Context,
    useDeskproAppClient,
    useDeskproAppEvents,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { pingService } from "../services/teamviewer";
import { useStore } from "../context/StoreProvider/hooks";
import { HomePage } from "./HomePage";
import { GlobalSignIn } from "./GlobalSignIn";
import { ErrorBlock } from "../components/common";

export const Main = () => {
    const [state, dispatch] = useStore();
    const { client } = useDeskproAppClient();

    if (state._error) {
        console.error(`TeamViewer: ${state._error}`);
    }

    useInitialisedDeskproAppClient((client) => {
        client?.registerElement("refreshButton", {
            type: "refresh_button"
        });
    });

    useInitialisedDeskproAppClient((client) => {
        pingService(client)
            .then(({ token_valid }) => {
                dispatch({ type: "setAuth", isAuth: token_valid });
                dispatch({ type: "changePage", page: "home" });
            })
            .catch(() => dispatch({ type: "setAuth", isAuth: false }))
    }, []);

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
        onChange: (context: Context) => {
            context && dispatch({ type: "loadContext", context });
        },
    }, [client]);

    if (!state.page) {
        return <GlobalSignIn/>;
    }

    const page = match(state.page)
            .with("home", () => <HomePage/>)
            .otherwise(() => <HomePage/>)

    return (
        <>
            {state._error && (
                <ErrorBlock text="An error occurred" />
            )}
            {!state.isAuth && (
                <ErrorBlock text="Go back to the admin settings form for the app and re-auth from there" />
            )}
            {page}
        </>
    );
};
