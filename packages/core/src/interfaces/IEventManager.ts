/**
 * 通用事件管理器接口
 * 负责游戏内的事件派发和监听
 */
export interface IEventManager {
    /**
     * 监听事件
     * @param eventName 事件名称
     * @param handler 回调函数
     * @param context 回调函数的执行上下文 (this)
     */
    on(eventName: string, handler: (...args: any[]) => void, context?: any): void;

    /**
     * 派发事件
     * @param eventName 事件名称
     * @param args 传递给回调函数的参数
     */
    emit(eventName: string, ...args: any[]): void;
}