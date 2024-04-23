import { get } from "lodash";
import { z } from "zod";
import type { Maybe, TicketData } from "../../types";
import type { FormValidationSchema } from "./types";
import type { SessionInput } from "../../services/teamviewer/types";

const validationSchema = z.object({
    description: z.string(),
    waitingMessage: z.string(),
    name: z.string().optional(),
    email: z.string().email().or(z.literal("")).optional(),
    valid_until: z.date().optional(),
});

const getInitValues = (ticket?: Maybe<TicketData["ticket"]>): FormValidationSchema => ({
    description: get(ticket, ["subject"]) || "",
    waitingMessage: "",
    name: get(ticket, ["primaryUser", "displayName"]) || "",
    email: get(ticket, ["primaryUser", "email"]) || get(ticket, ["primaryUser", "emails", 0]) || "",
});

const getSessionValues = (data: FormValidationSchema): SessionInput => ({
    groupname: "Deskpro",
    description: data.description,
    waiting_message: data.waitingMessage,
    end_customer: {
        name: data.name,
        email: data.email,
    },
});

export { validationSchema, getInitValues, getSessionValues };
