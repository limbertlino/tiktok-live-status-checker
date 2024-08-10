"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tiktokLiveDetector_1 = __importDefault(require("../services/tiktokLiveDetector"));
const test_config_1 = require("../config/test-config");
const axios_1 = __importDefault(require("axios"));
const SECONDS = 1000;
(0, vitest_1.describe)("TikTok Live Stream Detection", () => {
    (0, vitest_1.describe)("Verify by video tag", () => {
        vitest_1.test.concurrent("Should return true for a user who is currently live", async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByVideoTag(test_config_1.testUsers.activeUser);
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        vitest_1.test.concurrent("Should return false for a user who is not currently live", async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByVideoTag(test_config_1.testUsers.inactiveUser);
            (0, vitest_1.expect)(result.success).toBe(false);
        });
    });
    (0, vitest_1.describe)("Verify by TikTok API", () => {
        vitest_1.test.concurrent("Should return success true and status 2 when user is streaming", async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByTiktokApi(test_config_1.testUsers.activeUser);
            (0, vitest_1.expect)(result.success).toBe(true);
            (0, vitest_1.expect)(result.data).toBe("2");
            (0, vitest_1.expect)(result.error).toBeUndefined();
        });
        vitest_1.test.concurrent("Should return success false when user is not streaming", async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByTiktokApi(test_config_1.testUsers.inactiveUser);
            (0, vitest_1.expect)(result.success).toBe(false);
            (0, vitest_1.expect)(result.data).toBe("Room id not found");
            (0, vitest_1.expect)(result.error).toBeUndefined();
        });
        (0, vitest_1.test)("Should handle network errors", async () => {
            vitest_1.vi.spyOn(axios_1.default, "get").mockRejectedValue(new Error("Network Error"));
            const result = await tiktokLiveDetector_1.default.isLiveByTiktokApi(test_config_1.testUsers.activeUser);
            (0, vitest_1.expect)(result.success).toBe(false);
            (0, vitest_1.expect)(result.data).toBeNull();
            (0, vitest_1.expect)(result.error).toContain("Network Error");
            vitest_1.vi.resetAllMocks();
        });
    });
}, 100 * SECONDS);
