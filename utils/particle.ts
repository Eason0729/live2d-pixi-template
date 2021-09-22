import { Application, ParticleContainer, Sprite } from "pixi.js";
var app: Application;
var config = {
  amount: 120,
  size: { min: 0.03, max: 0.06 },
  speed: { min: 0.3, max: 0.5 },
};
var SnowContainer: ParticleContainer;
interface SnowsDetail {
  sprite: Sprite;
  velocity: number;
}
var Snows: SnowsDetail[] = [];
var waitingForConfig: "waiting" | "empty" = "empty";

function GenSnow(): Sprite {
  let circle = Sprite.from("/src/circle.png");
  let size = {
    base: config.size.min,
    dis: config.size.max - config.size.min,
  };
  circle.scale.set(Math.random() * size.dis + size.base);
  return circle;
}

export default {
  init(app_: Application) {
    app = app_;
    app.ticker.add((t) => {
      Snows.forEach((detail: SnowsDetail) => {
        if (detail.sprite.y >= window.innerHeight) {
          detail.sprite.y = 0;
          detail.sprite.x = window.innerWidth * Math.random();
        }
        detail.sprite.y += detail.velocity * t;
      });
    });
  },
  reset() {
    console.log(config);
    //if exist, delete it
    if (SnowContainer) {
      SnowContainer.parent.removeChild(SnowContainer);
      SnowContainer.destroy({
        children: true,
        texture: true,
        baseTexture: true,
      });
      Snows = [];
    }
    SnowContainer = new ParticleContainer(config.amount, {});
    app.stage.addChild(SnowContainer);
    for (let i = 0; i < config.amount; i++) {
      let ele = GenSnow();
      ele.x = -50;
      let speed = {
        base: config.speed.min,
        dis: config.speed.max - config.speed.min,
      };
      Snows.push({
        sprite: ele,
        velocity: Math.random() * speed.dis + speed.base,
      });

      SnowContainer.addChild(ele);
    }
  },
  setConfig(name: string, value: string) {
    let path: string[] = name.split(".");
    if (path.length == 2) config[path[0]][path[1]] = +value;
    else config[name] = +value;
    if (waitingForConfig == "empty") {
      waitingForConfig = "waiting";
      setTimeout(() => {
        this.reset();
        waitingForConfig = "empty";
      }, 100);
    }
  },
};
