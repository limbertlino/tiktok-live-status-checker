import tiktokCheckerService from "../services/tiktokLiveDetector";
import { Result } from "../types";

export const isLive = async (tiktokUser: string): Promise<Result> => {
  const checkByApi = await tiktokCheckerService.isLiveByTiktokApi(tiktokUser);
  const checkByTag = await tiktokCheckerService.isLiveByVideoTag(tiktokUser);

  if (checkByApi.success || checkByTag.success) {
    return { success: true };
  } else {
    return { success: false };
  }
};
