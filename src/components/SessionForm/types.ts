import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { Maybe, TicketData } from "../../types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type Props = {
    onSubmit: SubmitHandler<FormValidationSchema>;
    onCancel?: () => void;
    error?: Maybe<string|string[]>;
    ticket?: Maybe<TicketData["ticket"]>;
};
