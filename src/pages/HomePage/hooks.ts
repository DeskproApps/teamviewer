import { useMemo } from "react";
import { get } from "lodash";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getSessionsService } from "../../services/teamviewer";
import { isExpired } from "../../utils/date";
import { QueryKey } from "../../query";
import type { Session } from "../../services/teamviewer/types";

type UseSessions = () => {
    isLoading: boolean;
    activeSessions: Session[];
    expiredSessions: Session[];
};

const useSessions: UseSessions = () => {
    const sessions = useQueryWithClient([QueryKey.SESSIONS], getSessionsService);

    const [activeSessions, expiredSessions] = useMemo(() => {
        const newActiveSessions: Session[] = [];
        const newExpiredSessions: Session[] = [];

        (get(sessions.data, ["sessions"]) || []).forEach((session: Session) => {
            if (isExpired(session.valid_until)) {
                newExpiredSessions.push(session)
            } else {
                newActiveSessions.push(session);
            }
        });

        return [newActiveSessions, newExpiredSessions];
    }, [sessions.data]);

    return {
        isLoading: [sessions].some(({ isLoading }) => isLoading),
        activeSessions,
        expiredSessions,
    };
};

export { useSessions };
