import { useState, useCallback } from "react";
import { get, isString } from "lodash";
import { useNavigate } from "react-router-dom";
import {
    useDeskproAppClient,
    useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { createSessionService } from "../../services/teamviewer";
import { useAsyncError, useRegisterElements } from "../../hooks";
import { queryClient } from "../../query";
import { RATE_LIMIT_ERROR } from "../../constants";
import { CreateSession } from "../../components";
import { getSessionValues } from "../../components/SessionForm";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { FormValidationSchema } from "../../components/SessionForm";

const CreateSessionPage: FC = () => {
    const navigate = useNavigate();
    const { client } = useDeskproAppClient();
    const { context } = useDeskproLatestAppContext() as { context: TicketContext };
    const { asyncErrorHandler } = useAsyncError();
    const [error, setError] = useState<Maybe<string>>(null);

    const onCancel = useCallback(() => navigate("/home"), [navigate]);

    const onSubmit = useCallback((data: FormValidationSchema) => {
        if (!client) {
            return Promise.resolve();
        }

        setError(null);

        return createSessionService(client, getSessionValues(data))
            .then((res) => {
                if (isString(res) && `${res}`.includes("license limitations")) {
                    setError(RATE_LIMIT_ERROR);
                }
                return;
            })
            .then(() => queryClient.invalidateQueries())
            .then(() => navigate("/home"))
            .catch(asyncErrorHandler);
    }, [client, navigate, asyncErrorHandler]);

    useRegisterElements(({ registerElement }) => {
        registerElement("home", {
            type: "home_button",
            payload: { type: "changePage", path: "/home" },
        });
    });

    return (
        <CreateSession
            error={error}
            onCancel={onCancel}
            onSubmit={onSubmit}
            ticket={get(context, ["data", "ticket"])}
        />
    );
};

export { CreateSessionPage };
