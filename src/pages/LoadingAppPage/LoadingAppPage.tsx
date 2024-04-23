import { LoadingSpinner } from "@deskpro/app-sdk";
import { useCheckIsAuth } from "./hooks";

const LoadingAppPage = () => {
    useCheckIsAuth();

    return (
        <LoadingSpinner/>
    );
}

export { LoadingAppPage };
