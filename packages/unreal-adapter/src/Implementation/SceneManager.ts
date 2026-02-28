import * as UE from "ue";
import { ISceneManager } from "../../../core/src";

export class SceneManager implements ISceneManager {
    public async loadScene(sceneName: string): Promise<void> {
        console.log(`[UnrealAdapter] Loading scene: ${sceneName}`);
        let world = UE.GameplayStatics.GetGameInstance(null);
        UE.GameplayStatics.OpenLevel(world, sceneName, true, "");
        return Promise.resolve();
    }
}