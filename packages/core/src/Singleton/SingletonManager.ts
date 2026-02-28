
import { Constructor } from "./Define";
import { SingletonRegistry, SingletonType } from "./SingletonRegistry";

export class SingletonManager {
    private static classMap: Map<number, Constructor<any>> = new Map();
    private static instanceMap: Map<number, any> = new Map();

    public static Init():void{
        this.RegisterAll();
        for (const [type, Clazz] of this.classMap.entries()) {
            const instance = new Clazz();
            this.instanceMap.set(type, instance);
            instance.Init();
        }
    }

    public static Tick(delta: number): void {
        for (const instance of this.instanceMap.values()) {
            instance.Tick?.(delta);
        }
    }

    public static Get<T>(type: number): T {
        const instance = this.instanceMap.get(type);
        if (!instance) {
            throw new Error(`SingletonType ${type} not initialized.`);
        }
        return instance as T;
    }

    public static Release(): void {
        for (const instance of this.instanceMap.values()) {
            instance.Release?.();
        }
        this.instanceMap.clear();
    }

    private static RegisterAll():void{
        SingletonRegistry.forEach((value,key)=>{
        this.register(key, value);
        });
    }
    private static register<T>(type: number, clazz: Constructor<T>): void {
        if (this.classMap.has(type)) {
            throw new Error(`Singleton type ${SingletonType[type]} already registered.`);
        }
        this.classMap.set(type, clazz);
    }

    
}
