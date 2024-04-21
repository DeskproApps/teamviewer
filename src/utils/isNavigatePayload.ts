import { get } from "lodash";
import type { EventPayload, NavigateToChangePage } from "../types";

const isNavigatePayload = (
  payload: EventPayload
): payload is NavigateToChangePage => {
  return get(payload, ["type"]) === "changePage";
};

export { isNavigatePayload };
