import { Application } from "pixi.js";
import "/live2dcubismcore/live2dcubismcore";
import { Live2DModel } from "pixi-live2d-display";
import { Ticker, TickerPlugin } from "@pixi/ticker";
import background from "/utils/background";
import particle from "/utils/particle";
import live2dv from "/utils/live2dv";
// import spinev from "/utils/spinev";

var app: Application = new Application({
  view: document.querySelector("canvas") as HTMLCanvasElement,
  resolution: 1,
  backgroundColor: 0x000000,
  width: window.innerWidth,
  height: window.innerHeight,
});

//basic config
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

//init utils
background.init(app);
particle.init(app);
live2dv.init(app);

//do motion onclick
document.documentElement.addEventListener("click", async function () {
  if (!(await live2dv.forceMotion())) console.warn("random motion failed");
});
//The promise seem to reslove just right after getting ".motion.json" file.
//In order not to interput the previous motion, new feature in pixi-live2d-display need to be added.
//I will just leave it here.

//handler of lively wallpaper's property
function livelyPropertyListener(name: string, value: string) {
  // console.log(...arguments);
  var path = name.split("_");
  switch (path[0]) {
    case "background":
      background.setBackground(value);
      break;
    case "character":
      live2dv.setConfig(path[1], value);
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

//DEV ONLY
if (import.meta.env.MODE == "development")
  setTimeout(async function () {
    interface LivelyPropertie {
      type: "folderDropdown" | "textbox";
      value: string;
      text: string;
      filter: any;
      folder?: string;
    }
    let properties = await fetch("/src/test/LivelyProperties.json").then((x) =>
      x.json()
    );
    function getValue(inp: LivelyPropertie): string {
      if (inp.type == "folderDropdown") return inp.folder + "/" + inp.value;
      return inp.value;
    }
    for (let key in properties)
      livelyPropertyListener(key, getValue(properties[key]));
  }, 500);

import calculator from "/utils/calculator";
calculator.init(document.documentElement);
