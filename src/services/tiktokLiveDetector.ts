import { By, until } from "selenium-webdriver";
import { TIKTOK_BASE_URL, TIKTOK_LIVE_API_URL } from "../config";
import { initChromeDriver } from "../config/chromiumDriver";

import { Result } from "../types";
import { getTikTokLiveRoomId } from "../utils/getRoomId";
import axios, { AxiosError } from "axios";

const isLiveByVideoTag = async (tiktokUser: string): Promise<Result> => {
  let driver;
  try {
    driver = await initChromeDriver();

    try {
      await driver.get(`${TIKTOK_BASE_URL}${tiktokUser}/live`);
      const videoTag = await driver.wait(
        until.elementLocated(By.css("video")),
        10000
      );

      return { success: !!videoTag };
    } finally {
      await driver.quit();
    }
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message;
      if (message.includes("Waiting for element to be located By")) {
        return { success: false, error: error };
      }
      return { success: false, error };
    }
    return { success: false, error: new Error("Unknow error occurred") };
  }
};

const isLiveByTiktokApi = async (tiktokUser: string): Promise<Result> => {
  try {
    const roomIdResult = await getTikTokLiveRoomId(tiktokUser);

    if (!roomIdResult.success && !roomIdResult.error) return roomIdResult;

    const result = await axios.get(
      `${TIKTOK_LIVE_API_URL}${roomIdResult.data}`
    );
    const { status } = result.data.LiveRoomInfo as { status: number };

    return { success: status === 2, data: status.toString() };
  } catch (error: unknown) {
    let errorMessage = "An error has occurred: ";
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      errorMessage += axiosError.message;
    } else if (error instanceof Error) {
      errorMessage += error.message;
    } else {
      errorMessage += "Unknown error";
    }

    return { data: null, error: errorMessage, success: false };
  }
};

export default { isLiveByTiktokApi, isLiveByVideoTag };
