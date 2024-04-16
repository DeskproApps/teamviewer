import isEmpty from "lodash/isEmpty";
import { Login, Logout, CallbackUrl } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Account } from "../../services/teamviewer/types";

export type Props = {
    callbackUrl: Maybe<string>;
    user: Maybe<Account>;
    signOut: () => void;
    oAuthUrl: Maybe<string>;
    error: Maybe<string>;
    isLoading: boolean;
    signIn: () => void;
    cancelLoading: () => void;
};

const GlobalSignIn: FC<Props> = ({ user, callbackUrl, signOut, signIn, oAuthUrl, isLoading, cancelLoading, error }) => (
    <>
        {callbackUrl && <CallbackUrl url={callbackUrl}/>}
        {!isEmpty(user)
            ? (<Logout user={user} signOut={signOut} />)
            : (
                <Login
                    url={oAuthUrl || ""}
                    isLoading={isLoading}
                    signIn={signIn}
                    cancel={cancelLoading}
                    error={error}
                />
            )
        }
    </>
);

export { GlobalSignIn };
