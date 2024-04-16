import get from "lodash/get";
import { Stack } from "@deskpro/deskpro-ui";
import { TeamViewerError } from "../../services/teamviewer";
import { DEFAULT_ERROR } from "../../constants";
import { BaseContainer, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
    error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
    let message = DEFAULT_ERROR;
    const consoleMessage = error;

    if (error instanceof TeamViewerError) {
        message = get(error, ["data", "error"], DEFAULT_ERROR);
    }

    // eslint-disable-next-line no-console
    console.error(consoleMessage || error);
    console.log(">>> error:");
    console.dir(error);

    return (
        <BaseContainer>
            <ErrorBlock
                text={(
                    <Stack gap={6} vertical style={{ padding: "8px" }}>
                        {message}
                    </Stack>
                )}
            />
        </BaseContainer>
    );
};

export { ErrorFallback };
