import { TIKTOK_BASE_URL, config } from '../config';
import axios, { AxiosError } from 'axios';
import { Result } from '../types';

export const getTikTokLiveRoomId = async (
  tiktokUser: string
): Promise<Result> => {
  try {
    const response = await axios.get<string>(
      `${TIKTOK_BASE_URL}${tiktokUser}/live`,
      config
    );

    const htmlContent = response.data;
    const ROOM_ID_REGEX = /snssdk1233:\/\/live\?room_id=(\d+)/;
    const match = htmlContent.match(ROOM_ID_REGEX);
    const roomId = match ? match[1] : null;
    if (roomId === null) return { success: false, data: 'Room id not found' };
    return { success: true, data: roomId };
  } catch (error: unknown) {
    let errorMessage = 'An error has occurred while fetching room_id data: ';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      errorMessage += axiosError.message;
    } else if (error instanceof Error) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Unknown error';
    }

    return { data: null, error: errorMessage, success: false };
  }
};
