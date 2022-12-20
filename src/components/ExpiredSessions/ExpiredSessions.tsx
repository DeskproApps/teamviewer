import { HorizontalDivider, Stack } from "@deskpro/app-sdk";
import { Title, TwoColumn } from "../common";
import { SessionTitle } from "../SessionTitle";
import { getDate } from "../../utils/date";
import { Session } from "../../services/teamviewer/types";

const ExpiredSessions = ({ sessions }: { sessions: Session[] }) => (
    <>
        <Title>Expired Sessions ({sessions.length})</Title>
        {sessions.map(({ code, created_at, valid_until }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <SessionTitle title={code} />
                <TwoColumn
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
