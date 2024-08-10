"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiktokLiveDetector_1 = __importDefault(require("../src/services/tiktokLiveDetector"));
const main = async () => {
    const tiktokUser = "eldiariodecj";
    try {
        // const apiResult = await tiktokService.isLiveByVideoTag(tiktokUser);
        // const apiResult = await tiktokService.isLiveByTiktokApi(tiktokUser);
        const apiResult = await tiktokLiveDetector_1.default.isLiveByVideoTag(tiktokUser);
        console.log(apiResult);
    }
    catch (error) {
        console.error("Error al ejecutar los servicios: ", error);
    }
};
main().catch((err) => console.error("Error inesperado en main: ", err));
