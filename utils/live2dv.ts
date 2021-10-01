import { Application } from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
const vaildFile: string[] = ["model3.json", "model.json"];
var config = {
    x: -10,
    y: 45,
    size: 0.15,
    model: "/src/runtime/rice_pro_t03.model3.json",
    frequency: 0.075,
  },
  live2dSprite: Live2DModel,
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
    if (live2dSprite) {
      live2dSprite.parent.removeChild(live2dSprite);
      return true;
    }
    return false;
  },
  async setModel(path: string): Promise<boolean> {
    let fileList = vaildFile.map((x) => new RegExp(x)).map((x) => x.test(path));
    let isLive2d = fileList.reduce((a, b) => a || b, false);
    if (!isLive2d) {
      this.swap();
      return false;
    }
    //if exist, remove it.
    if (live2dSprite) live2dSprite.parent.removeChild(live2dSprite);
    //load Sprite
    live2dSprite = await Live2DModel.from(path);
    //list motion for further handling
    var modelJson = await fetch(path).then((x) => x.clone().json());
    let motions: SingleMotion[] = modelJson.FileReferences.Motions;
    for (let key in motions)
      if (key.toString().toLowerCase() != "idle") MotionList.push(key);
    //insert child
    app.stage.addChild(live2dSprite);
    //load inheritary config
    live2dSprite.x = config.x;
    live2dSprite.y = config.y;
    live2dSprite.scale.set(config.size);
    return true;
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
        live2dSprite.x = +value;
        break;
      case "y":
        live2dSprite.y = +value;
        break;
      case "size":
        live2dSprite.scale.set(+value);
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
    return live2dSprite.motion(MotionList[i]);
  },
  async forceMotion(): Promise<boolean> {
    if (!live2dSprite) return false;
    await this.randomMotion();
    return true;
  },
};
