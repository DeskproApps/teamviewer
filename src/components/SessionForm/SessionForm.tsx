import { has } from "lodash";
import { useForm } from "react-hook-form";
import { Input, Stack } from "@deskpro/deskpro-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { getInitValues, validationSchema } from "./utils";
import { Label, Button, ErrorBlock } from "../common";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const SessionForm: FC<Props> = ({ error, onSubmit, onCancel, ticket }) => {
    const {
        watch,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValidationSchema>({
        defaultValues: getInitValues(ticket),
        resolver: zodResolver(validationSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ErrorBlock text={error}/>}

            <Label htmlFor="description" label="Description">
                <Input
                    id="description"
                    type="text"
                    variant="inline"
                    inputsize="small"
                    placeholder="Add value"
                    error={has(errors, ["description", "message"])}
                    value={watch("description")}
                    {...register("description")}
                />
            </Label>

            <Label htmlFor="waitingMessage" label="Waiting message">
                <Input
                    id="waitingMessage"
                    type="text"
                    variant="inline"
                    inputsize="small"
                    placeholder="Add value"
                    error={has(errors, ["waitingMessage", "message"])}
                    value={watch("waitingMessage")}
                    {...register("waitingMessage")}
                />
            </Label>

            <Label htmlFor="name" label="Name of the end customer">
                <Input
                    id="name"
                    type="text"
                    variant="inline"
                    inputsize="small"
                    placeholder="Add value"
                    error={has(errors, ["name", "message"])}
                    value={watch("name")}
                    {...register("name")}
                />
            </Label>

            <Label htmlFor="email" label="Email of the end customer">
                <Input
                    id="email"
                    type="text"
                    variant="inline"
                    inputsize="small"
                    placeholder="Add value"
                    error={has(errors, ["email", "message"])}
                    value={watch("email")}
                    {...register("email")}
                />
            </Label>

            <Stack justify="space-between">
                <Button
                    type="submit"
                    text="Create"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                />
                <Button
                    type="button"
                    text="Cancel"
                    intent="tertiary"
                    onClick={onCancel}
                />
            </Stack>
        </form>
    );
};

export { SessionForm };
