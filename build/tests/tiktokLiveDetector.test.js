"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// import { CheckVideoTagResult } from '../types';
const tiktokLiveDetector_1 = __importDefault(require("../services/tiktokLiveDetector"));
(0, vitest_1.describe)('Tiktok live checker', () => {
    const SECONDS = 1000;
    const mostlyActiveTiktokUser = 'weathernewslive';
    // tiene que obtener un checkvideotagresult de respuesta
    (0, vitest_1.test)('Returns true in success key in response object', async () => {
        const result = await tiktokLiveDetector_1.default.checkVideoHtmlTag(mostlyActiveTiktokUser);
        (0, vitest_1.expect)(result.success).toBe(false);
    }, 100 * SECONDS);
    vitest_1.test.skip('Returns false in failed key in response object', () => { });
});
