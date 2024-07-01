"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTikTokLiveRoomId = void 0;
const config_1 = require("../config");
const axios_1 = __importDefault(require("axios"));
const getTikTokLiveRoomId = async (tiktokUser) => {
    try {
        const response = await axios_1.default.get(`${config_1.TIKTOK_BASE_URL}${tiktokUser}/live`, config_1.config);
        const htmlContent = response.data;
        const ROOM_ID_REGEX = /snssdk1233:\/\/live\?room_id=(\d+)/;
        const match = htmlContent.match(ROOM_ID_REGEX);
        const roomId = match ? match[1] : null;
        if (roomId === null)
            return { success: false, data: 'Room id not found' };
        return { success: true, data: roomId };
    }
    catch (error) {
        let errorMessage = 'An error has occurred while fetching room_id data: ';
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            errorMessage += axiosError.message;
        }
        else if (error instanceof Error) {
            errorMessage += error.message;
        }
        else {
            errorMessage += 'Unknown error';
        }
        return { data: null, error: errorMessage, success: false };
    }
};
exports.getTikTokLiveRoomId = getTikTokLiveRoomId;
