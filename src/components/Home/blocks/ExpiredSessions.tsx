import { Stack } from "@deskpro/deskpro-ui";
import { Title, TwoProperties, HorizontalDivider } from "@deskpro/app-sdk";
import { getDate } from "../../../utils/date";
import { Session } from "../../../services/teamviewer/types";

const ExpiredSessions = ({ sessions }: { sessions: Session[] }) => (
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
