import { BaseContainer } from "../common";
import { SessionForm } from "../SessionForm";
import type { FC } from "react";
import type { Props as FormProps } from "../SessionForm";

type Props = FormProps & {
    //..
};

const CreateSession: FC<Props> = (props) => {
    return (
        <BaseContainer>
            <SessionForm {...props}/>
        </BaseContainer>
    );
};

export { CreateSession };
