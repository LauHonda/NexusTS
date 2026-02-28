import { Singleton } from "../Define";
import { IDataManager, IEventManager, ILogger, IResourceManager, ISceneManager, IUIManager } from "../../interfaces";
import { ConsoleLogger } from "../../implementations";

export class INexus extends Singleton<INexus> {
    public logger: ILogger | undefined;
    public event: IEventManager | undefined;
    public resource: IResourceManager | undefined;
    public scene: ISceneManager | undefined;
    public ui: IUIManager | undefined;
    public data: IDataManager | undefined;
    constructor() {
        super();
        console.log('INexus created');
    }
    Init(): void {
        this.logger = new ConsoleLogger();
        // this.event = managers.eventManager;
        // this.resource = managers.resourceManager;
        // this.ui = managers.uiManager;
        // this.data = managers.dataManager;
        console.log('INexus Init');
    }
    Tick(delate: number): void {
        console.log('INexus Tick');
    }
    Release(): void {
        console.log('INexus Release');
    }
}