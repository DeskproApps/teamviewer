import { get } from "lodash";
import type { EventPayload, DeleteSessionPayload } from "../types";

const isDeleteSessionPayload = (
    payload: EventPayload
): payload is DeleteSessionPayload => {
    return get(payload, ["type"]) === "delete";
};

export { isDeleteSessionPayload };
