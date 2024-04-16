import styled from "styled-components";
import { H2, P1 } from "@deskpro/deskpro-ui";
import { CopyToClipboardInput } from "@deskpro/app-sdk";
import type { FC } from "react";

export type Props = {
    url: string;
};

const Description = styled(P1)`
    margin-bottom: 16px;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.grey80};
`;

const CallbackUrl: FC<Props> = ({ url }) => {
    return (
        <>
            <H2 style={{ marginBottom: "5px" }}>Callback URL</H2>
            <CopyToClipboardInput value={url}/>
            <Description>The callback URL will be required during TeamViewer app setup</Description>
        </>
    );
};

export { CallbackUrl };
