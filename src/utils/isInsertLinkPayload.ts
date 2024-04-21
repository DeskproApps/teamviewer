import { get } from "lodash";
import type { EventPayload, InsertLinkPayload } from "../types";

const isInsertLinkPayload = (
    payload: EventPayload,
): payload is InsertLinkPayload => {
    return get(payload, ["type"]) === "insertLink";
};

export { isInsertLinkPayload };
