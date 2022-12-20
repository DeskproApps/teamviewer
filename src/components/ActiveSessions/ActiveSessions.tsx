import { Button, HorizontalDivider, Stack } from "@deskpro/app-sdk";
import { TextBlockWithLabel, Title } from "../common";
import { SessionTitle } from "../SessionTitle";
import { getDate } from "../../utils/date";
import { Session } from "../../services/teamviewer/types";

type ActiveSessionsProps = {
    sessions: Session[],
    onCreate: () => void,
    onInsertLink: (sessionLink: Session["end_customer_link"]) => void,
    onDelete: (code: Session["code"]) => void,
};

const ActiveSessions = ({ sessions, onCreate, onDelete, onInsertLink }: ActiveSessionsProps) => (
    <>
        <Title
            title={`Active Sessions (${sessions.length})`}
            onClick={(sessions.length > 0) ? onCreate : undefined}
        />

        {sessions.map(({ code, created_at, end_customer_link }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <SessionTitle title={code} link={end_customer_link} />
                <TextBlockWithLabel label="Created" text={getDate(created_at)} />
                <Stack justify="space-between" style={{ width: "100%", marginBottom: "14px" }}>
                    <Button text="Insert link" intent="secondary" onClick={() => onInsertLink(end_customer_link)} />
                    <Button text="Delete" intent="secondary" onClick={() => onDelete(code)} />
                </Stack>
                <HorizontalDivider style={{ width: "100%" }}/>
            </Stack>
        ))}

        {sessions.length === 0 && (
            <>
                <Button text="Create New Session" onClick={onCreate} intent="secondary" />
                <HorizontalDivider style={{ width: "100%", margin: "15px 0" }}/>
            </>
        )}
    </>
);

export { ActiveSessions };
