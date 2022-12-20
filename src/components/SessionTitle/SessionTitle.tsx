import { H3, Stack } from "@deskpro/app-sdk";
import { TeamViewerLink } from "../common";
import { Session } from "../../services/teamviewer/types";

type SessionTitleProps = {
    title: Session["code"],
    link?: Session["end_customer_link"],
};

const SessionTitle = ({ title, link }: SessionTitleProps) => (
    <Stack
        gap={6}
        align="center"
        justify="space-between"
        style={{ marginBottom: "7px", width: "100%" }}
    >
        <H3>{title}</H3>
        {link && (<TeamViewerLink href={link}/>)}
    </Stack>
);

export { SessionTitle };
