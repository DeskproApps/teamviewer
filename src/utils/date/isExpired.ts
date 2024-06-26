import isAfter from "date-fns/isAfter";
import { DateTime } from "../../types";

const isExpired = (checkingDate: DateTime): boolean => {
    return isAfter(new Date(), new Date(checkingDate));
};

export { isExpired };
