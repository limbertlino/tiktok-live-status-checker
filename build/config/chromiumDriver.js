"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initChromeDriver = exports.options = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
exports.options = new chrome_1.Options();
exports.options.addArguments('--headless', '--incognito');
const initChromeDriver = async () => {
    const driver = await new selenium_webdriver_1.Builder()
        .forBrowser(selenium_webdriver_1.Browser.CHROME)
        .setChromeOptions(exports.options)
        .build();
    return driver;
};
exports.initChromeDriver = initChromeDriver;
