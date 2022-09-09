import { match } from "ts-pattern";
import {
    Context,
    useDeskproAppClient,
    useDeskproAppEvents,
    useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useStore } from "../context/StoreProvider/hooks";
import { HomePage } from "./HomePage";
import { LogInPage } from "./LogInPage";

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

    useDeskproAppEvents({
        onShow: () => {
            client && setTimeout(() => client.resize(), 200);
        },
        onChange: (context: Context) => {
            context && dispatch({ type: "loadContext", context });
        },
    }, [client]);

    const page = !state.isAuth
        ? <LogInPage/>
        : match(state.page)
            .with("home", () => <HomePage/>)
            .with("log_in", () => <LogInPage/>)
            .otherwise(() => <LogInPage/>)

    return (
        <>
            {page}
        </>
    );
};
