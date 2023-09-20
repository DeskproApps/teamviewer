import type { TeamViewerAPIError } from "./types";

export type InitData = {
    status: number,
    data: TeamViewerAPIError,
};

class TeamViewerError extends Error {
    status: number;
    data: TeamViewerAPIError;

    constructor({ status, data }: InitData) {
        const message = "TeamViewer Api Error";
        super(message);

        this.data = data;
        this.status = status;
    }
}

export { TeamViewerError };
