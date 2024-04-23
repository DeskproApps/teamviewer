import { HorizontalDivider } from "@deskpro/app-sdk";
import { BaseContainer } from "../common";
import { ActiveSessions, ExpiredSessions } from "./blocks";
import type { FC } from "react";
import type { Session } from "../../services/teamviewer/types";

export type Props = {
    activeSessions: Session[];
    expiredSessions: Session[];
    onNavigateToCreate: () => void;
    onDelete: (code: Session["code"]) => void;
    onInsertLink: (sessionLink: Session["end_customer_link"]) => void;
};

const Home: FC<Props> = ({
    onNavigateToCreate,
    onDelete,
    onInsertLink,
    activeSessions,
    expiredSessions,
}) => {
    return (
        <>
            <BaseContainer>
                <ActiveSessions
                    sessions={activeSessions}
                    onCreate={onNavigateToCreate}
                    onDelete={onDelete}
                    onInsertLink={onInsertLink}
                />
            </BaseContainer>
            <HorizontalDivider />
            <BaseContainer>
                <ExpiredSessions sessions={expiredSessions} />
            </BaseContainer>
        </>
    );
};

export { Home };
