/**
 * 通用的日志接口，所有引擎都必须实现它
 */
export interface ILogger {
    log(message: string): void;
    error(message: string): void;
}