# WebBuild
Web build automation to transpile ES6, minify CSS and JS, inject into HTML, and move files from a to b. Requires Node JS 6+. Uses `gulp` and many `gulp` modules.

## Use
`WebBuild` comes with 5 dead-simple functions to help you set up and build your front-end web application. The purpose of doing this is to minimize file requests and sizes between your server and clients. It also allows extremely easy sharing of common files without the need to include them in each HTML page. Look at the full tutorial in the [wiki](https://github.com/Voliware/WebBuild/wiki/tutorial).

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
