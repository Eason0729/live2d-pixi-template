import { Spine } from "pixi-spine";
import { Application, Sprite } from "pixi.js";
var config = {
    x: -10,
    y: 45,
    size: 0.15,
    model: "/src/runtime/rice_pro_t03.model3.json",
    frequency: 0.075,
  },
  spineSprite: Sprite&Spine,
  intervalId: number,
  MotionList: string[] = [],
  app: Application,
  Queue: configEvent[] = [],
  configEventing: "doing" | "empty" = "empty";
interface SingleMotion {
  File: string;
  Sound?: string;
}
interface configEvent {
  name: string;
  value: string;
}
export default {
  init(app_: Application) {
    app = app_;
  },
  swap(): boolean {
    if (spineSprite) {
      spineSprite.parent.removeChild(spineSprite);
      return true;
    }
    return false;
  },
  async setModel(path: string) {
    //if exist, remove it.
    if (spineSprite) spineSprite.parent.removeChild(spineSprite);
    //load Sprite
    app.loader.add("spine", path).load(function (loader, resources) {
      spineSprite = new Spine(resources.spine.spineData);
      app.stage.addChild(spineSprite);
      // if (spineSprite.state.hasAnimation('run')) {
      //     // run forever, little boy!
      //     spineSprite.state.setAnimation(0, 'run', true);
      //     // dont run too fast
      //     spineSprite.state.timeScale = 0.1;
      // }
      // app.start();
    });

    //load inheritary config
    spineSprite.x = config.x;
    spineSprite.y = config.y;
    // spineSprite.scale.set(config.size);
  },
  setConfig(name: string, value: string) {
    let cur: configEvent = { name, value };
    Queue.unshift(cur);
    this.configQueue();
  },
  async configQueue(): Promise<boolean> {
    //dealing with queue
    if (configEventing != "empty") return false;
    if (Queue.length == 0) return true;
    configEventing = "doing";
    let cur: configEvent = Queue.pop();
    //dealing with action
    let name = cur.name,
      value = cur.value;
    if (name == "model") {
      config[name] = value;
      await this.setModel(value);
    }
    config[name] = +value;
    switch (name) {
      case "x":
        spineSprite.x = +value;
        break;
      case "y":
        spineSprite.y = +value;
        break;
      case "size":
        // spineSprite.scale.set(+value);
        break;
      case "frequency":
        if (intervalId) clearInterval(intervalId);
        setInterval(this.randomMotion, 1000 / +value);
    }
    //end session
    configEventing = "empty";
    this.configQueue();
    return true;
  },
  randomMotion(): Promise<boolean> {
    let i = Math.floor(MotionList.length * Math.random());
    // return spineSprite.motion(MotionList[i]);
    return Promise.resolve(true);
  },
  async forceMotion(): Promise<boolean> {
    if (!spineSprite) return false;
    await this.randomMotion();
    return true;
  },
};
