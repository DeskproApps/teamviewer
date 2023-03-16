export const BASE_URL = "https://webapi.teamviewer.com/api/v1";

export const placeholders = {
    GLOBAL_ACCESS_TOKEN: `__global_access_token.json("[accessToken]")__`,
    GLOBAL_REFRESH_TOKEN: `__global_access_token.json("[refreshToken]")__`,
    ACCESS_TOKEN: "[[oauth/global/access_token]]",
    REFRESH_TOKEN: "[[oauth/global/refresh_token]]",
};
