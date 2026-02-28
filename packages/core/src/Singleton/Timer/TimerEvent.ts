export class TimerEvent {
    constructor(
        public readonly id: number,
        private _manager: typeof import('./TimerManager').TimerManager
    ) {}

    /** 通过事件具柄移除自己 */
    remove() {
        this._manager.remove(this);
    }

    pause() {
        this._manager.pause(this.id);
    }

    resume() {
        this._manager.resume(this.id);
    }

    /** 获取剩余时间（毫秒），暂停时返回暂停时剩余 */
    get remaining(): number | null {
        return this._manager.getRemaining(this.id);
    }
}
