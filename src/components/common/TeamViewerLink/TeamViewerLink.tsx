import styled from "styled-components";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import {
    Icon,
    Stack,
    RoundedLabelTag,
} from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import { TeamViewerLogo } from "./TeamViewerLogo";
import { Props } from "./types";

const Container = styled(Stack)`
  align-items: center; 
  padding: 2px;
`;

const Link = styled.a`
    border-radius: 10px;
    border: 1px solid transparent;
    color: ${({ theme }) => (theme.colors.brandShade100)};
    cursor: pointer;
    
    :hover {
        border-color: ${({ theme }) => (theme.colors.brandShade60)};
    };
`;

export const TeamViewerIcon = styled(Icon)`
    display: inline-block !important;
    width: 12px;
    height: 12px;
    padding: 0 6px 0 0;
    cursor: pointer;
`;

const TeamViewerLink = ({ href }: Props) => {
    const { theme } = useDeskproAppTheme();

    return (
        <Link target="_blank" href={href}>
            <RoundedLabelTag
                size="small"
                withClose={false}
                backgroundColor={theme.colors.brandShade20}
                textColor={theme.colors.grey100}
                borderColor={theme.colors.brandShade20}
                closeIcon={faArrowUpRightFromSquare}
                label={(
                    <Container>
                        <TeamViewerIcon icon={<TeamViewerLogo/>} />
                        <Stack>
                            <Icon icon={faArrowUpRightFromSquare} />
                        </Stack>
                    </Container>
                )}
            />
        </Link>
    );
}

export { TeamViewerLink }
