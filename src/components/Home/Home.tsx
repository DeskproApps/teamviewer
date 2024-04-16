import { BaseContainer, ErrorBlock } from "../common";
import { ActiveSessions, ExpiredSessions } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Session } from "../../services/teamviewer/types";

export type Props = {
    rateLimitError: Maybe<string>;
    activeSessions: Session[];
    expiredSessions: Session[];
    onCreate: () => void;
    onDelete: (code: Session["code"]) => void;
    onInsertLink: (sessionLink: Session["end_customer_link"]) => void;
};

const Home: FC<Props> = ({
    onCreate,
    onDelete,
    onInsertLink,
    rateLimitError,
    activeSessions,
    expiredSessions,
}) => {
    return (
        <BaseContainer>
            {rateLimitError && <ErrorBlock text={rateLimitError} />}
            <ActiveSessions
                sessions={activeSessions}
                onCreate={onCreate}
                onDelete={onDelete}
                onInsertLink={onInsertLink}
            />
            <ExpiredSessions sessions={expiredSessions} />
            <br/><br/><br/>
        </BaseContainer>
    );
};

export { Home };
