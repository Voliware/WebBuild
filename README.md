# WebBuild
Web build automation to transpile ES6, minify CSS and JS, inject into HTML, and move files from a to b. Requires Node JS 6+. Uses `gulp` and many `gulp` modules.

## Use
`WebBuild` comes with 5 dead-simple functions to help you set up and build your front-end web application. The purpose of doing this is to minimize file requests and sizes between your server and clients. It also allows extremely easy sharing of common files without the need to include them in each HTML page. Look at the full tutorial in the [wiki](https://github.com/Voliware/WebBuild/wiki/tutorial) or read the blurbs and examples that follow.

### buildFileSys
A convenient way to create objects that reflect the file system paths of your project. This can make accessing your source and build files through the build script much eaiser.

#### Example
This will build up an object containing all source paths (not files) for a project.
```js
var src = {};
src.root = 'C:/web/project/';
buildFileSys(src, 'assets');
```
`buildFileSys` will add `assets` as a property of `src` and automatically add five predefined paths. The resulting object is:
```js
src.assets = {
   js : 'C:/web/project/assets/js/',
   css : 'C:/web/project/assets/css/',
   fonts : 'C:/web/project/assets/fonts/',
   html : 'C:/web/project/assets/html/',
   img : 'C:/web/project/assets/img/'
};
```
You can also add exta paths as a last argument.
```js
buildFileSys(src, 'myApp', {docs : 'docs/'});
```
### buildJs
Transpiles ES6 to ES5.1 using `Babel`, concats JS files in order, minifies them, and optionally renames the final JS file.

#### Example
This will take the three files, `timer.js`, `date.js`, and `myApp.js`, combine them into one file, `myApp.min.js`, minify, rename, and save it into a file path defiend in `build.myApp`.
```js
var jsFiles = [
   src.assets.js + 'timer.js',
   src.assets.js + 'date.js',
   src.myApp.js + 'myApp.js'
];
return buildJs(jsFiles, build.myApp, 'myApp');
```

### buildCss
Concats CSS files in order, minifies them, and optionally renames the final CSS file.

#### Example
This will take the three files, `timer.css`, `date.css`, and `myApp.css`, combine them into one file, `style.min.css`, minify, and save it into a file path defiend in `build.myApp`.
```js
var cssFiles = [
   src.assets.css + 'timer.css',
   src.assets.css + 'date.css',
   src.timeApp.css + 'myApp.css'
];
// no final argument defaults to "style.min.css"
return buildCss(cssFiles, build.myApp);
```

### buildInject
Injects a file as a `UTF8` string into an HTML file, placed in between a start and end injection tag. This is most useful for injecting HTML into HTML, or script and stylesheet paths into HTML.

#### Example
This will take the file `header.html` and inject it into `template.html` in between the tags `<!--inject:header-->` and `<!--endinject-->`. Finally it will rename the file to `index.html` and save it to the file path as defined in `build.myApp`.
```js
var templateFile = src.assets.html + 'template.html';
var headerFile = src.assets.html + 'header.html';
return buildInject(templateFile, headerFile, `header`, build.myApp, 'index.html');
```

### buildMove
Simply moves file(s) from a to b
#### Example
```js
var srcFiles = [
   src.assets.fonts + 'fontawesome.woff2',
   src.assets.fonts + 'myFont.woff2'
];
return buildMove(srcFiles, build.myApp);
```

### Gulp and Pump
As a convenience, `WebBuild` also exposes and exports `gulp` and `buildPump`, which is a tiny wrapper around [pump](https://www.npmjs.com/package/pump) that simply logs error messages.

## Installation
```js
npm install --save-dev gulp-webbuild
```
## Contributors
Written by Anthony Agostino

## License
Licensed under the MIT license
