import {
  Application,
  Sprite,
  Texture,
} from "pixi.js";
var backgroundSprite: Sprite;
var app: Application;
export default {
  init(app_: Application) {
    app = app_;
  },
  setBackground(path: string) {
    console.log(path)
    backgroundSprite = new Sprite(Texture.from(path));
    backgroundSprite.zIndex=-1;
    app.stage.addChild(backgroundSprite);
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    backgroundSprite.width = window.innerWidth;
    backgroundSprite.height = window.innerHeight;
    app.stage.sortChildren();
  },
};
