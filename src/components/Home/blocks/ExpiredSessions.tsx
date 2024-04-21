import { Fragment } from "react";
import { Title, TwoProperties, HorizontalDivider, Property } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { DPNormalize } from "../../common";
import type { FC } from "react";
import type { Session } from "../../../services/teamviewer/types";

export type Props = {
    sessions: Session[],
};

const ExpiredSessions: FC<Props> = ({ sessions }) => (
    <>
        <Title title={`Expired Sessions (${sessions.length})`}/>
        {sessions.map(({ code, created_at, valid_until, description }) => (
            <Fragment key={code}>
                <Title title={code} />
                <Property
                    label="Description"
                    text={<DPNormalize text={description}/>}
                />
                <TwoProperties
                    leftLabel="Created"
                    leftText={format(created_at)}
                    rightLabel="Expired"
                    rightText={format(valid_until)}
                />
                <HorizontalDivider style={{ marginBottom: 15 }}/>
            </Fragment>
        ))}
    </>
);

export { ExpiredSessions };
