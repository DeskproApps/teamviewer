import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, HorizontalDivider, Stack } from "@deskpro/app-sdk";
import { TextBlockWithLabel, Title } from "../common";
import { SessionTitle } from "../SessionTitle";
import { getDate } from "../../utils/date";
import { Session } from "../../services/teamviewer/types";

type ActiveSessionsProps = {
    sessions: Session[],
    onCreate: () => void,
    onDelete: (code: Session["code"]) => void,
};

const ActiveSessions = ({ sessions, onCreate, onDelete }: ActiveSessionsProps) => (
    <>
        <Title>
            Active Sessions ({sessions.length})&nbsp;
            {sessions.length > 0 && (
                <Button
                    minimal
                    icon={faPlus}
                    noMinimalUnderline
                    onClick={onCreate}
                    title="Create New Session"
                />
            )}
        </Title>

        {sessions.map(({ code, created_at, end_customer_link }) => (
            <Stack key={code} vertical style={{ marginBottom: "15px" }}>
                <SessionTitle title={code} link={end_customer_link} />
                <TextBlockWithLabel label="Created" text={getDate(created_at)} />
                <Stack justify="space-between" style={{ width: "100%", marginBottom: "14px" }}>
                    <CopyToClipboard text={end_customer_link}>
                        <Button text="Copy link" intent="secondary" type="button" />
                    </CopyToClipboard>
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
