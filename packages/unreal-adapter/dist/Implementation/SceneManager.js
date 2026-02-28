"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
const UE = require("ue");
class SceneManager {
    loadScene(sceneName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[UnrealAdapter] Loading scene: ${sceneName}`);
            let world = UE.GameplayStatics.GetGameInstance(null);
            UE.GameplayStatics.OpenLevel(world, sceneName, true, "");
            return Promise.resolve();
        });
    }
}
exports.SceneManager = SceneManager;
//# sourceMappingURL=SceneManager.js.map