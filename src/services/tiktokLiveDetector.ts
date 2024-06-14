import { By, until } from 'selenium-webdriver';
import { TIKTOK_BASE_URL } from '../config';
import { initChromeDriver } from '../config/chromiumDriver';

import { CheckVideoTagResult } from '../types';

const isLiveByVideoTag = async (
  tiktokUser: string
): Promise<CheckVideoTagResult> => {
  let driver;
  try {
    driver = await initChromeDriver();

    try {
      await driver.get(`${TIKTOK_BASE_URL}${tiktokUser}/live`);
      const videoTag = await driver.wait(
        until.elementLocated(By.css('video')),
        10000
      );

      return { success: !!videoTag };
    } finally {
      await driver.quit();
    }
  } catch (error) {
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

export default { isLiveByVideoTag };
