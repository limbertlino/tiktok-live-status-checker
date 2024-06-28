"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const tiktokLiveDetector_1 = __importDefault(require("../services/tiktokLiveDetector"));
const test_config_1 = require("../config/test-config");
const SECONDS = 1000;
(0, vitest_1.describe)('TikTok Live Stream Detection', () => {
    (0, vitest_1.describe)('Verify by video tag', () => {
        vitest_1.test.concurrent('Should return true for a user who is currently live', async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByVideoTag(test_config_1.testUsers.activeUser);
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        vitest_1.test.concurrent('Should return false for a user who is not currently live', async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByVideoTag(test_config_1.testUsers.inactiveUser);
            (0, vitest_1.expect)(result.success).toBe(false);
        });
    });
    vitest_1.describe.only('Verify by live API', () => {
        (0, vitest_1.test)('Should return status number 2 if the user is streaming online', async () => {
            const result = await tiktokLiveDetector_1.default.isLiveByTiktokApi(test_config_1.testUsers.activeUser);
            (0, vitest_1.expect)(result.success).toBe(true);
        });
    });
}, 100 * SECONDS);
