"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const config_1 = require("../config");
const chromiumDriver_1 = require("../config/chromiumDriver");
const checkVideoHtmlTag = async (tiktokUser) => {
    let driver;
    try {
        driver = await (0, chromiumDriver_1.initChromeDriver)();
        try {
            await driver.get(`${config_1.TIKTOK_BASE_URL}${tiktokUser}/live`);
            const videoTag = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('video')), 10000);
            return !!videoTag;
        }
        finally {
            await driver.quit();
        }
    }
    catch (error) {
        if (error instanceof Error) {
            const message = error.message;
            if (message.includes('Waiting for element to be located By')) {
                return false;
            }
        }
        return false;
    }
};
exports.default = { checkVideoHtmlTag };
