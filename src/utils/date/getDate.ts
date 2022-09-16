import format from "date-fns/format";
import { DateTime } from "../../services/teamviewer/types";

const getDate = (date?: DateTime): string => {
    if (!date) {
        return "-";
    }

    return format((new Date(date)), "d MMM yyyy HH:mm");
};

export { getDate };
