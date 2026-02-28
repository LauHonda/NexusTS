import { Constructor } from "./Define";
import { INexus, TestSingleton } from "./SingletonClass";

export enum SingletonType {
    TestSingleton = 0,
    INexus = 1
    // 更多单例
}

export const SingletonRegistry: Map<number, Constructor<any>> = new Map([
    [SingletonType.TestSingleton, TestSingleton],
    [SingletonType.INexus, INexus]
    // 其他注册项
]);

export function AddSingleton(type: number, constructor: Constructor<any>) {
    SingletonRegistry.set(type, constructor);
}
export function RemoveSingleton(type: number) {
    SingletonRegistry.delete(type);
}