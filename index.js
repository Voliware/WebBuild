/*!
 * gulp-webbuild <https://github.com/voliware/webbuild>
 * Copyright (c) 2016 Anthony Agostino
 * Licensed under the MIT License
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var pump = require('pump');

/**
 * Build a common web file system, creating
 * an object with properties as paths
 * @param {object} root - the project root object
 * @param {string} root.root - the filepath of the project root
 * @param {string} fsName - the file system name to build
 * @param {object} [paths] - an optional object of additional paths
 */
function buildFileSys(root, fsName, paths){
	var defaults = {
		css : 'css/',
		fonts : 'fonts/',
		html : 'html/',
		img : 'img/',
		js : 'js/'
	};
	paths = Object.assign(defaults, paths || {});

	root[fsName] = {};
	root[fsName].root = root.root + fsName + '/';
	for (var path in paths) {
		root[fsName][path] = root[fsName].root + paths[path];
	}
}

/**
 * Use pump to build and log errors
 * @param source
 */
function buildPump(source){
	return pump(source, null, function(err){
		if(err)
			console.log(err);
	});
}

/**
 * Move files from a to b
 * @param {string|string[]} src - source file path(s)
 * @param {string} dest - destination path
 */
function buildMove(src, dest){
	return buildPump([
		gulp.src(src),
		gulp.dest(dest)
	]);
}

/**
 * Build javascript files into one
 * minified and transpiled file
 * @param {string|string[]} src - source file path(s)
 * @param {string} dest - destination path
 * @param {string} [name='app'] - output file name
 */
function buildJs(src, dest, name){
	name = name
		? name
		: 'app';
	return buildPump([
		gulp.src(src),
		// non minified
		concat(name + '.js'),
		babel({presets: [es2015]}),
		gulp.dest(dest),
		// minified
		rename(name + '.min.js'),
		uglify(),
		gulp.dest(dest)
	]);
}

/**
 * Build css files into one minified file
 * @param {string|string[]} src - source file path(s)
 * @param {string} dest - destination path
 * @param {string} [name='style'] - output file name
 */
function buildCss(src, dest, name){
	name = name
		? name
		: 'style';
	return buildPump([
		gulp.src(src),
		// non minified
		concat(name + '.css'),
		gulp.dest(dest),
		// minified
		rename(name + '.min.css'),
		uglifycss(),
		gulp.dest(dest)
	]);
}

/**
 * Inject files into another file
 * @param {string} src - source file path
 * @param {string|string[]} files
 * @param {string} tag - tag to inject after
 * @param {string} dest - destination file path
 * @param {string} [name] - destination file name.
 * If omitted, will be the src name.
 * @returns {*}
 */
function buildInject(src, files, tag, dest, name){
	var g = gulp.src(src)
		.pipe(inject(gulp.src(files), {
			starttag: '<!-- inject:'+tag+' -->',
			transform: function (filePath, file) {
				return file.contents.toString('utf8');
			}
		}));
	if(name)
		g = g.pipe(rename(name))

	return g.pipe(gulp.dest(dest));
}

exports.gulp = gulp;
exports.buildPump = buildPump;
exports.buildJs = buildJs;
exports.buildCss = buildCss;
exports.buildMove = buildMove;
exports.buildInject = buildInject;
exports.buildFileSys = buildFileSys;