import { Stack } from "@deskpro/deskpro-ui";
import { Title, TwoProperties, HorizontalDivider } from "@deskpro/app-sdk";
import { getDate } from "../../../utils/date";
import type { FC } from "react";
import type { Session } from "../../../services/teamviewer/types";

export type Props = {
    sessions: Session[],
};

const ExpiredSessions: FC<Props> = ({ sessions }) => (
    <>
        <Title title={`Expired Sessions (${sessions.length})`}/>
        {sessions.map(({ code, created_at, valid_until }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <Title title={code} />
                <TwoProperties
                    leftLabel="Created"
                    leftText={getDate(created_at)}
                    rightLabel="Expired"
                    rightText={getDate(valid_until)}
                />
                <HorizontalDivider style={{ width: "100%" }}/>
            </Stack>
        ))}
    </>
);

export { ExpiredSessions };
