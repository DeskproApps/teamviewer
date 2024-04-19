import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { P1, Button } from "@deskpro/deskpro-ui";
import { Valid } from "../../common";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Account } from "../../../services/teamviewer/types";

export type Props = {
    user: Account;
    signOut: () => void;
};

const Logout: FC<Props> = ({ signOut, user }) => (
    <>
        <P1 style={{ marginBottom: "6px" }}>
            Signed-in as <Valid>{user.name} {user.email ? `<${user.email}>` : ""}</Valid>
        </P1>
        <Button
            text="Sign-out"
            intent="secondary"
            icon={faSignOut as AnyIcon}
            onClick={signOut}
        />
    </>
);

export { Logout };
