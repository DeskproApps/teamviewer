import { Button, Stack } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider, Property } from "@deskpro/app-sdk";
import { TeamViewerLogo } from "../../common";
import { getDate } from "../../../utils/date";
import type { FC } from "react";
import type { Session } from "../../../services/teamviewer/types";

export type Props = {
    sessions: Session[],
    onCreate: () => void,
    onInsertLink: (sessionLink: Session["end_customer_link"]) => void,
    onDelete: (code: Session["code"]) => void,
};

const ActiveSessions: FC<Props> = ({
    sessions,
    onCreate,
    onDelete,
    onInsertLink,
}) => (
    <>
        <Title
            title={`Active Sessions (${sessions.length})`}
            onClick={(sessions.length > 0) ? onCreate : undefined}
        />

        {sessions.map(({ code, created_at, end_customer_link, supporter_link }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <Title
                    title={code}
                    link={supporter_link}
                    icon={<TeamViewerLogo/>}
                />
                <Property label="Created" text={getDate(created_at)} />
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
