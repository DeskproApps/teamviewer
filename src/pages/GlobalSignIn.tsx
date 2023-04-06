import { FC } from "react";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { AnchorButton } from "@deskpro/deskpro-ui";
import {
    P1,
    H2,
    Button,
    useDeskproAppTheme,
    CopyToClipboardInput
} from "@deskpro/app-sdk";
import { useGlobalSignIn } from "../hooks/useGlobalSignIn";
import { Account } from "../services/teamviewer/types";
import { Loading } from "../components/common";

const Description = styled(P1)`
    margin-bottom: 16px;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.grey80};
`;

const CallbackUrl = ({ url }: { url: string }) => {
    return (
        <>
            <H2 style={{ marginBottom: "5px" }}>Callback URL</H2>
                <CopyToClipboardInput value={url}/>
            <Description>The callback URL will be required during TeamViewer app setup</Description>
        </>
    );
};

const Login = ({ url, isLoading, signIn, cancel }: { url: string, isLoading: boolean, signIn: () => void, cancel: () => void }) => {
    return (
        <>
            <P1 style={{ marginBottom: "6px" }}>
                This TeamViewer user account will be used by all Deskpro agents
            </P1>
            <AnchorButton
                href={url}
                target="_blank"
                text="Sign-In"
                icon={faSignIn}
                intent="secondary"
                size="small"
                disabled={!url}
                loading={isLoading}
                onClick={signIn}
            />
            {isLoading && (
                <Button
                    onClick={cancel}
                    text="Cancel"
                    intent="secondary"
                    style={{ marginLeft: "6px" }}
                />
            )}
        </>
    );
};

const Logout = ({ signOut, user }: { user: Account, signOut: () => void }) => {
    const { theme } = useDeskproAppTheme();
    return (
        <>
            <P1 style={{ marginBottom: "6px" }}>
                Signed-in as <span style={{ color: theme.colors.grey100 }}>{user.name} {user.email ? `<${user.email}>` : ""}</span>
            </P1>
            <Button text="Sign-out" intent="secondary" icon={faSignOut} onClick={signOut} />
        </>
    );
};

const GlobalSignIn: FC = () => {
    const {
        callbackUrl,
        user,
        oAuthUrl,
        isLoading,
        isBlocking,
        cancelLoading,
        signIn,
        signOut,
    } = useGlobalSignIn();

    if (isBlocking) {
        return (<Loading/>);
    }

    return (
        <>
            {callbackUrl && <CallbackUrl url={callbackUrl}/>}
            {!isEmpty(user)
                ? (<Logout user={user} signOut={signOut} />)
                : (<Login url={oAuthUrl || ""} isLoading={isLoading} signIn={signIn} cancel={cancelLoading}/>)
            }
        </>
    );
}

export { GlobalSignIn };
