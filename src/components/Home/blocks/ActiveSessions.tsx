import { Fragment } from "react";
import { Button, Stack } from "@deskpro/deskpro-ui";
import { Link as RouterLink } from "react-router-dom";
import { Link, Title, HorizontalDivider, Property } from "@deskpro/app-sdk";
import { TeamViewerLogo, DPNormalize } from "../../common";
import { format } from "../../../utils/date";
import { isLast } from "../../../utils";
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

        {sessions.map(({ code, created_at, end_customer_link, supporter_link, description }, idx) => (
            <Fragment key={code}>
                <Title
                    title={(
                        <Link as={RouterLink} to={`/sessions/view/${code}`}>{code}</Link>
                    )}
                    link={supporter_link}
                    icon={<TeamViewerLogo/>}
                />
                <Property
                    label="Description"
                    text={<DPNormalize text={description}/>}
                />
                <Property label="Created" text={format(created_at)} />
                <Stack justify="space-between" style={{ width: "100%", marginBottom: "14px" }}>
                    <Button text="Insert link" intent="secondary" onClick={() => onInsertLink(end_customer_link)} />
                    <Button text="Delete" intent="secondary" onClick={() => onDelete(code)} />
                </Stack>
                {!isLast(sessions, idx) && (
                    <HorizontalDivider style={{ marginBottom: 15 }}/>
                )}
            </Fragment>
        ))}

        {sessions.length === 0 && (
            <Button text="Create New Session" onClick={onCreate} intent="secondary" />
        )}
    </>
);

export { ActiveSessions };
