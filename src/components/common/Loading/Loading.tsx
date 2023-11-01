import { FC } from "react";
import { Spinner, SpinnerProps, Stack } from "@deskpro/deskpro-ui";

const Loading: FC<SpinnerProps> = (props) => (
    <Stack justify="center">
        <Spinner {...props} />
    </Stack>
);

export { Loading };
