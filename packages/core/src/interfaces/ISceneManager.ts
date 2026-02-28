/**
 * 通用场景管理器接口
 * 负责游戏场景的加载和切换
 */
export interface ISceneManager {
    /**
     * 异步加载场景
     * @param sceneName 场景名称
     */
    loadScene(sceneName: string): Promise<void>;
}