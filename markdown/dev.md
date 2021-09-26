In here, we use vite to dev the app.
# development mode

1. download Live2d Cubism web SDK core, and store it under `<root folder>/live2dcubismcore`
note: download both Cubism 3 and Cubism 4
2. install npm by yarn(or normal npm tool if you like)
3. Open terminal, and execute
```batch
vite
```

# production mode

1. Open terminal, and execute
```batch
vite build
```
2. place `LivelyProperties.json` and `LivelyInfo.json` under output folder(`<root folder>/dist`)
3. download Live2d Cubism web SDK core, and store it under `<root folder>/dist/live2dcubismcore`
4. And that's it.