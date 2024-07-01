"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const config_1 = require("../config");
const chromiumDriver_1 = require("../config/chromiumDriver");
const getRoomId_1 = require("../utils/getRoomId");
const axios_1 = __importDefault(require("axios"));
const isLiveByVideoTag = async (tiktokUser) => {
    let driver;
    try {
        driver = await (0, chromiumDriver_1.initChromeDriver)();
        try {
            await driver.get(`${config_1.TIKTOK_BASE_URL}${tiktokUser}/live`);
            const videoTag = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('video')), 10000);
            return { success: !!videoTag };
        }
        finally {
            await driver.quit();
        }
    }
    catch (error) {
        if (error instanceof Error) {
            const message = error.message;
            if (message.includes('Waiting for element to be located By')) {
                return { success: false, error: error };
            }
            return { success: false, error };
        }
        return { success: false, error: new Error('Unknow error occurred') };
    }
};
const isLiveByTiktokApi = async (tiktokUser) => {
    try {
        const roomIdResult = await (0, getRoomId_1.getTikTokLiveRoomId)(tiktokUser);
        if (!roomIdResult.success && !roomIdResult.error)
            return roomIdResult;
        const result = await axios_1.default.get(`${config_1.TIKTOK_LIVE_API_URL}${roomIdResult.data}`);
        const { status } = result.data.LiveRoomInfo;
        return { success: status === 2, data: status.toString() };
    }
    catch (error) {
        let errorMessage = 'An error has occurred: ';
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
exports.default = { isLiveByVideoTag, isLiveByTiktokApi };
