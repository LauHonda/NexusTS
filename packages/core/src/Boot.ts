import { TimerManager , TimerEvent} from "./Singleton/Timer";
import { SingletonManager } from './Singleton';


let Timer :TimerEvent|undefined;
Boot();
function Boot() {
    console.log("App 启动");
    SingletonManager.Init();
       Timer = TimerManager.add({
          delay: 200,
          loop: true,
          tag: 'Tick',
          owner:"Boot",
          callback: (delta) => {
            SingletonManager.Tick(delta);
          },
        });
}
function OnShutdown(){
    TimerManager.remove("Boot",Timer);
    SingletonManager.Release();
    console.log("App 关闭");
}