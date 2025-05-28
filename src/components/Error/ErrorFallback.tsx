import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { TeamViewerError } from "../../services/teamviewer";
import { DEFAULT_ERROR, RATE_LIMIT_ERROR, AUTH_ERROR } from "../../constants";
import { BaseContainer, ErrorBlock } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ error }) => {
  let message = DEFAULT_ERROR;

  if (error instanceof TeamViewerError) {
    message = get(error, ["data", "error"], DEFAULT_ERROR);
  } else if (`${get(error, ["message"])}`.includes("license limitations")) {
    message = RATE_LIMIT_ERROR;
  } else if (`${get(error, ["message"])}`.includes("refresh_token")) {
    message = AUTH_ERROR;
  }

  // eslint-disable-next-line no-console
  console.error(error);

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
