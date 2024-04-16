import styled from "styled-components";
import { TSpan } from "@deskpro/deskpro-ui";
import type { TProps } from "@deskpro/deskpro-ui";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<Omit<TProps, "type">> & {
  type?: TProps["type"],
};

const ValidStyled = styled(TSpan)`
  color: ${({ theme }) => theme.colors.grey100};
`;

const Valid: FC<Props> = ({ type = "p1", ...props }) => (
  <ValidStyled type={type} {...props} />
);

export { Valid };
