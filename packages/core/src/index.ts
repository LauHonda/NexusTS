import { IDataManager, IEventManager, ILogger, IResourceManager, ISceneManager, IUIManager } from "./interfaces";

/**
 * 框架初始化所需的管理器实现集合
 */
export interface FrameworkManagers {
    logger: ILogger;
    eventManager: IEventManager;
    resourceManager: IResourceManager;
    sceneManager: ISceneManager;
    uiManager: IUIManager;
    dataManager: IDataManager;
}

/**
 * 游戏框架核心类
 * 作为所有管理器的静态访问入口 (服务定位器)
 */
export class GameFramework {
    public static logger: ILogger;
    public static event: IEventManager;
    public static resource: IResourceManager;
    public static scene: ISceneManager;
    public static ui: IUIManager;
    public static data: IDataManager;

    /**
     * 初始化框架。这是使用框架前必须调用的第一个方法。
     * @param managers 包含所有管理器具体实现的对象
     */
    public static init(managers: FrameworkManagers) {
        this.logger = managers.logger;
        this.event = managers.eventManager;
        this.resource = managers.resourceManager;
        this.scene = managers.sceneManager;
        this.ui = managers.uiManager;
        this.data = managers.dataManager;

        this.logger.log("GameFramework Core Initialized!");
    }

    /**
     * 记录一条普通日志
     * @param msg 日志消息
     */
    public static log(msg: string) {
        if (this.logger) {
            this.logger.log(`[Core] ${msg}`);
        }
    }

    /**
     * 记录一条错误日志
     * @param msg 错误消息
     */
    public static error(msg: string) {
        if (this.logger) {
            this.logger.error(`[Core] ${msg}`);
        }
    }
}