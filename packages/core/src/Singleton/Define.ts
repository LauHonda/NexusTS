export type Constructor<T> = new () => T;
export abstract class Singleton<T> {
    protected constructor() {};
    abstract Init():void;
    abstract Tick(delate:number):void;
    abstract Release():void;

}