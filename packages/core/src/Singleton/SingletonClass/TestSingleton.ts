import { Singleton } from "../Define";

export class TestSingleton extends Singleton<TestSingleton> {
        constructor() {
        super();
        console.log('TestSingleton created');
    }
    Init(): void {
        console.log('TestSingleton Init');
    }
    Tick(delate: number): void {
        console.log('TestSingleton Tick');
    }
    Release(): void {
        console.log('TestSingleton Release');
    }
}
