/**
 * 通用 UI 管理器接口
 * 负责 UI 面板的打开、关闭和管理
 */
export interface IUIManager {
    /**
     * 异步打开 UI 面板
     * @param uiName UI 面板的名称或路径
     * @param args 传递给 UI 面板的参数
     * @returns 返回一个 Promise，可以在 UI 打开后执行操作
     */
    openPanel(uiName: string, ...args: any[]): Promise<void>;

    /**
     * 关闭 UI 面板
     * @param uiName UI 面板的名称或路径
     */
    closePanel(uiName: string): void;
}