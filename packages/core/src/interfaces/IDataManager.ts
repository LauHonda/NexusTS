/**
 * 通用数据管理器接口
 * 负责数据的读取和存储，如玩家存档
 */
export interface IDataManager {
    /**
     * 保存数据
     * @param key 数据的键
     * @param data 要保存的数据
     */
    save(key: string, data: any): void;

    /**
     * 读取数据
     * @param key 数据的键
     * @param defaultValue 如果没有找到数据，则返回此默认值
     */
    load<T>(key: string, defaultValue?: T): T;
}