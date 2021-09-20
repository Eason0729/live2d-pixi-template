# live2d-pixi-template

This is a wallpaper project, allow you to custiomize and use the live2d model you choosed.
<!--lack of short intro-->
The project require [lively wallpaper](https://rocksdanister.github.io/lively/).

## Setup

In short, you will need
1.  [lively wallpaper](https://rocksdanister.github.io/lively/) ( versions under v1.7.0.4 were not tested ) install on your computer
2.  Download the release of this project.
3.  Download and install Cubism web SDK.

For detailed tutorial, please read [setup.md](/setup.md).

## preview

![img](https://i.imgur.com/UXUWL9S.png)

![img](https://i.imgur.com/YOzyM7W.png)

## Cubism

Cubism is the name of Live2D SDK. In here we need web SDK. So far there is mainly three version 2.1, 3 and 4.
This project only support version 3 and 4.
In order to run wallpaper smoothly, you will need to download web SDK yourself.

- Cubism 4(or 3) 

General user cannot redistribute web SDK, but you can download yourself.
Download `live2dcubismcore.min.js` from their [website](https://www.live2d.com/download/cubism-sdk/download-web/) and store it under `<project root folder path>/live2dcubismcore/`.

- Cubism 2

 `live2d.min.js` is no longer available on their website, but you can download it [here](https://github.com/dylanNew/live2d/tree/master/webgl/Live2D/lib) or [cdn](https://cdn.jsdelivr.net/gh/dylanNew/live2d/webgl/Live2D/lib/live2d.min.js). Also store it under `<project root folder path>/live2dcubismcore/`.

## PixiJS

The PIXIJS library was under [LICENSE](https://raw.githubusercontent.com/pixijs/pixijs/dev/LICENSE), see their [website](https://pixijs.com/) for more.

## pixi-live2d-display

The pixi-live2d-display framework was under [LICENSE](https://raw.githubusercontent.com/guansss/pixi-live2d-display/master/LICENSE), and [github repository](https://github.com/guansss/pixi-live2d-display)

## example Live2D models

The example Live2D models, Rice Glassfield, are redistributed under Live2D's [Free Material License](https://www.live2d.jp/en/terms/live2d-free-material-license-agreement/).