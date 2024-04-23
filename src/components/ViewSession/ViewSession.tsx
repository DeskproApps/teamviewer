import { get } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { format } from "../../utils/date";
import { BaseContainer, TeamViewerLogo, DPNormalize } from "../common";
import type { FC } from "react";
import type { Session } from "../../services/teamviewer/types";

type Props = {
    session: Session;
};

const ViewSession: FC<Props> = ({ session }) => {
    return (
        <BaseContainer>
            <Title
                title={get(session, ["code"])}
                link={get(session, ["supporter_link"])}
                icon={<TeamViewerLogo/>}
            />
            <Property
                label="Description"
                text={(
                    <DPNormalize text={get(session, ["description"])}/>
                )}
            />
            <Property
                label="Waiting message"
                text={(
                    <DPNormalize text={get(session, ["waiting_message"])}/>
                )}
            />
            <Property
                label="Supporter link"
                text={get(session, ["supporter_link"])}
                copyText={get(session, ["supporter_link"])}
            />
            <Property
                label="End customer link"
                text={get(session, ["end_customer_link"])}
                copyText={get(session, ["end_customer_link"])}
            />
            <Property
                label="Created at"
                text={format(get(session, ["created_at"]))}
            />
            <Property
                label="Valid until"
                text={format(get(session, ["valid_until"]))}
            />
            <Property
                label="End customer name"
                text={get(session, ["end_customer", "name"])}
            />
            <Property
                label="End customer email"
                text={get(session, ["end_customer", "email"])}
            />
        </BaseContainer>
    );
};

export { ViewSession };
