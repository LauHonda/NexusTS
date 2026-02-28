/**
 * 通用资源管理器接口
 * 负责资源的加载和卸载
 */
export interface IResourceManager {
    /**
     * 异步加载资源
     * @param path 资源路径 (引擎相关的路径)
     * @returns 返回一个包含已加载资源的 Promise
     */
    load<T>(path: string): Promise<T>;

    /**
     * 释放资源
     * @param path 资源路径
     */
    release(path: string): void;
}