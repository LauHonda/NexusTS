import { TimerEvent } from "./TimerEvent";

type TimerCallback = (delta: number) => void;

interface TimerOptions {
    callback: TimerCallback;
    delay: number;
    loop?: boolean;
    tag?: string;
    owner?: object | string;
}

interface TimerInternal {
    id: number;
    callback: TimerCallback;
    delay: number;
    loop: boolean;
    tag?: string;
    owner?: object | string;
    handle: ReturnType<typeof setTimeout> | null;
    lastTime: number;
    paused: boolean;
    remaining: number;
}

export class TimerManager {
    private static _nextId = 1;
    private static _timers: Map<number, TimerInternal> = new Map();

    public static add(options: TimerOptions): TimerEvent {
        const id = this._nextId++;
        const now = Date.now();

        const task: TimerInternal = {
            id,
            callback: options.callback,
            delay: options.delay,
            loop: options.loop ?? false,
            tag: options.tag,
            owner: options.owner,
            handle: null,
            lastTime: now,
            paused: false,
            remaining: options.delay,
        };

        this._start(task);
        this._timers.set(id, task);
        return new TimerEvent(id, this);
    }

    private static _start(task: TimerInternal) {
        const tick = () => {
            const now = Date.now();
            const delta = (now - task.lastTime) / 1000;
            task.lastTime = now;
            task.callback(delta);

            if (!task.loop) {
                this.remove(task.id);
            }
        };

        if (task.loop) {
            task.handle = setInterval(tick, task.delay);
        } else {
            task.handle = setTimeout(tick, task.delay);
        }
    }

    private static _clearTimer(task: TimerInternal) {
        if (task.handle === null) return;
        clearTimeout(task.handle);
        task.handle = null;
    }

    public static remove(arg1: object | string | TimerEvent | number, arg2?: string | TimerEvent): void {
        if (typeof arg1 === "string" && arg2 === undefined) {
            for (const [id, task] of this._timers) {
                if (task.tag === arg1) {
                    this._clearTimer(task);
                    this._timers.delete(id);
                }
            }
            return;
        }

        if (arg1 instanceof TimerEvent && arg2 === undefined) {
            this.remove(arg1.id);
            return;
        }

        if (typeof arg1 === "number") {
            const task = this._timers.get(arg1);
            if (task) {
                this._clearTimer(task);
                this._timers.delete(arg1);
            }
            return;
        }

        if ((typeof arg1 === "object" || typeof arg1 === "string") && arg2 === undefined) {
            for (const [id, task] of this._timers) {
                if (task.owner === arg1) {
                    this._clearTimer(task);
                    this._timers.delete(id);
                }
            }
            return;
        }

        if ((typeof arg1 === "object" || typeof arg1 === "string") && typeof arg2 === "string") {
            for (const [id, task] of this._timers) {
                if (task.owner === arg1 && task.tag === arg2) {
                    this._clearTimer(task);
                    this._timers.delete(id);
                }
            }
            return;
        }

        if ((typeof arg1 === "object" || typeof arg1 === "string") && arg2 instanceof TimerEvent) {
            const task = this._timers.get(arg2.id);
            if (task && task.owner === arg1) {
                this._clearTimer(task);
                this._timers.delete(arg2.id);
            }
            return;
        }
    }

    public static pause(id: number): void {
        const task = this._timers.get(id);
        if (!task || task.paused) return;

        const elapsed = Date.now() - task.lastTime;
        task.remaining = Math.max(0, task.delay - elapsed);
        task.paused = true;

        this._clearTimer(task);
    }

    public static resume(id: number): void {
        const task = this._timers.get(id);
        if (!task || !task.paused) return;

        task.lastTime = Date.now();
        task.paused = false;

        const tick = () => {
            const now = Date.now();
            const delta = (now - task.lastTime) / 1000;
            task.lastTime = now;
            task.callback(delta);

            if (!task.loop) {
                this.remove(task.id);
            }
        };

        task.handle = task.loop
            ? setInterval(tick, task.delay)
            : setTimeout(tick, task.remaining);
    }

    public static getRemaining(id: number): number | null {
        const task = this._timers.get(id);
        if (!task) return null;

        if (task.paused) return task.remaining;

        const elapsed = Date.now() - task.lastTime;
        return Math.max(0, task.delay - elapsed);
    }

    public static clearAll(): void {
        for (const task of this._timers.values()) {
            this._clearTimer(task);
        }
        this._timers.clear();
    }
}
