import { useParams } from "react-router-dom";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements } from "../../hooks";
import { useSession } from "../../hooks";
import { ViewSession } from "../../components";
import type { FC } from "react";

const ViewSessionPage: FC = () => {
    const { code } = useParams();
    const { isLoading, session } = useSession(code);

    useRegisterElements(({ registerElement }) => {
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" },
        });
        registerElement("menu", {
            type: "menu",
            items: [
                ...(!session?.end_customer_link ? [] : [{
                    title: "Insert link",
                    payload: { type: "insertLink", link: session.end_customer_link },
                }]),
                ...(!code ? [] : [{
                    title: "Delete",
                    payload: { type: "delete", code: session?.code },
                }]),
            ],
        });
    }, [session?.code, session?.end_customer_link]);

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <ViewSession session={session}/>
    );
};

export { ViewSessionPage };
