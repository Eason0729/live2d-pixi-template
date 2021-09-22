import { Application } from "pixi.js";
import "/live2dcubismcore/live2dcubismcore";
// import "/live2dcubismcore/live2dcubismcore.d.ts";
import { Live2DModel } from "pixi-live2d-display";
import { Ticker, TickerPlugin } from "@pixi/ticker";
import background from "/utils/background";
import particle from "/utils/particle";
import character from "/utils/character";

const IsDev = true;
var app: Application = new Application({
  view: document.querySelector("canvas") as HTMLCanvasElement,
  resolution: 1,
  backgroundColor: 0x000000,
  width: window.innerWidth,
  height: window.innerHeight,
});

//base config
var config = { sleep: 120 * 1000 };

//sleep
var sleeptime = 0;
setInterval(() => {
  sleeptime += 300;
  if (sleeptime >= config.sleep) app.stop();
}, 300);
document.addEventListener("mousemove", () => {
  if (sleeptime >= config.sleep) app.start();
  sleeptime = 0;
});

//model ticker
Application.registerPlugin(TickerPlugin);
Live2DModel.registerTicker(Ticker);

//init managers
background.init(app);
particle.init(app);
character.init(app);

function livelyPropertyListener(name: string, value: string) {
  // console.log(...arguments);
  var path = name.split("_");
  switch (path[0]) {
    case "background":
      background.setBackground(value);
      break;
    case "character":
      character.setConfig(path[1], value);
      break;
    case "particle":
      particle.setConfig(path.slice(1).join("."), value);
      break;
    case "sleep":
      config.sleep = +value * 1000;
      break;
  }
}
window.livelyPropertyListener = livelyPropertyListener;
// if (IsDev) entry();
if (IsDev)
  setTimeout(() => {
    livelyPropertyListener("background", "src/background.jpg");
    livelyPropertyListener(
      "character_model",
      "src/runtime/rice_pro_t03.model3.json"
    );
    livelyPropertyListener("character_x", "-10");
    livelyPropertyListener("character_y", "45");
    livelyPropertyListener("character_size", "0.15");
    livelyPropertyListener("particle_amount", "120");
    livelyPropertyListener("particle_size_min", "0.03");
    livelyPropertyListener("particle_size_max", "0.06");
    livelyPropertyListener("particle_speed_min", "0.3");
    livelyPropertyListener("particle_speed_max", "0.5");
    livelyPropertyListener("sleep", "5");
  }, 500);
