import {
  Application,
  Sprite,
  Texture,
  ParticleContainer,
  Renderer,
} from "pixi.js";
import "/live2dcubismcore/live2dcubismcore";
// import "/live2dcubismcore/live2dcubismcore.d.ts";
import { Live2DModel } from "pixi-live2d-display";
import { Ticker, TickerPlugin } from "@pixi/ticker";
import { InteractionManager } from "@pixi/interaction"; 

var IsDev = false,
  inited = false,
  config = {
    background: { path: "/src/background.jpg" },
    character: {
      x: -10,
      y: 45,
      scale: 0.15,
      path: "/src/runtime/rice_pro_t03.model3.json",
    },
    motion: {
      frequency: 0.075,
    },
    particle: {
      amount: 120,
      size: { min: 0.03, max: 0.06 },
      speed: { min: 0.3, max: 0.5 },
    },
    sleep: 10,
  },
  app: Application;
function entry(): boolean {
  if (inited) return false;
  inited = true;
  console.log("config:");
  console.log(config);
  app = new Application({
    view: document.querySelector("canvas") as HTMLCanvasElement,
    resolution: 1,
    backgroundColor: 0x000000,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  // register the Ticker to support automatic updating of Live2D models
  Application.registerPlugin(TickerPlugin);
  Live2DModel.registerTicker(Ticker);

  // register the InteractionManager to support automatic interaction of Live2D models
  Renderer.registerPlugin("interaction", InteractionManager);

  //background

  var backgroundsprite = new Sprite(Texture.from(config.background.path));
  app.stage.addChild(backgroundsprite);
  backgroundsprite.x = 0;
  backgroundsprite.y = 0;
  backgroundsprite.width = window.innerWidth;
  backgroundsprite.height = window.innerHeight;

  //snow container

  const SnowContainer = new ParticleContainer(config.particle.amount, {});
  interface SnowsDetail {
    sprite: Sprite;
    velocity: number;
  }
  var Snows: SnowsDetail[] = [];

  app.stage.addChild(SnowContainer);

  function GenSnow(): Sprite {
    let circle = Sprite.from("/src/circle.png");
    let size = {
      base: config.particle.size.min,
      dis: config.particle.size.max - config.particle.size.min,
    };
    circle.scale.set(Math.random() * size.dis + size.base);
    return circle;
  }
  for (let i = 0; i < config.particle.amount; i++) {
    let ele = GenSnow();
    ele.x = -50;
    let speed = {
      base: config.particle.speed.min,
      dis: config.particle.speed.max - config.particle.speed.min,
    };
    Snows.push({
      sprite: ele,
      velocity: Math.random() * speed.dis + speed.base,
    });
    SnowContainer.addChild(ele);
  }

  app.ticker.add((t) => {
    Snows.forEach((detail: SnowsDetail) => {
      if (detail.sprite.y >= window.innerHeight) {
        detail.sprite.y = 0;
        detail.sprite.x = window.innerWidth * Math.random();
      }
      detail.sprite.y += detail.velocity * t;
    });
  });

  //live2d

  var charater: Sprite,
    MotionList: string[] = [];
  (async function () {
    //init modle

    charater = await Live2DModel.from(config.character.path);
    app.stage.addChild(charater);
    charater.x = config.character.x;
    charater.y = config.character.y;
    charater.scale.set(config.character.scale);

    //init motion

    //init MotionList
    var modelJson = await fetch(config.character.path).then((x) =>
      x.clone().json()
    );

    interface SingleMotion {
      File: string;
      Sound?: string;
    }
    let motions: SingleMotion[] = modelJson.FileReferences.Motions;
    for (let key in motions)
      if (key.toString().toLowerCase() != "idle") MotionList.push(key);

    //auto motion
    setInterval(() => {
      let i = Math.floor(MotionList.length * Math.random());
      charater.motion(MotionList[i]);
    }, 1000 / config.motion.frequency);
  })();

  //sleep
  
  var sleeptime = config.sleep * 1000;
  setInterval(() => {
    sleeptime -= 300;
    if (sleeptime <= 0) app.stop();
  }, 300);
  document.addEventListener("mousemove", () => {
    if (sleeptime <= 0) app.start();
    sleeptime = config.sleep * 1000;
  });

  return true;
}

function livelyPropertyListener(name: string, value: string) {
  // console.log(...arguments);
  switch (name) {
    case "model":
      config.character.path = value;
      break;
    case "background":
      config.background.path = value;
      break;
    case "x":
      config.character.x = +value;
      break;
    case "y":
      config.character.y = +value;
      break;
    case "size":
      config.character.scale = +value;
      break;
    case "motionfrequency":
      config.motion.frequency = +value;
      break;
    case "particleamount":
      config.particle.amount = +value;
      break;
    case "particlesizemin":
      config.particle.size.min = +value;
      break;
    case "particlesizemax":
      config.particle.size.max = +value;
      break;
    case "sleep":
      config.sleep = +value;
      break;
    case "particlespeedmin":
      config.particle.speed.min = +value;
      break;
    case "particlespeedmax":
      config.particle.speed.min = +value;
      if (!IsDev) {
        entry();
        console.log("starting...");
      }
      break;
    default:
  }
}
window.livelyPropertyListener = livelyPropertyListener;
if (IsDev) entry();
