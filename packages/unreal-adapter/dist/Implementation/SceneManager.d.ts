import { ISceneManager } from "../../../core/src";
export declare class SceneManager implements ISceneManager {
    loadScene(sceneName: string): Promise<void>;
}
