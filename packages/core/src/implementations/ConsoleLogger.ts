import { ILogger } from "../interfaces";

/**
 * 默认的控制台日志记录器
 * 适用于浏览器、Node.js 以及支持标准 console API 的环境
 */
export class ConsoleLogger implements ILogger {
    public log(message: string): void {
        console.log(message);
    }

    public error(message: string): void {
        console.error(message);
    }
}
