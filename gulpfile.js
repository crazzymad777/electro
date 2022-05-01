'use strict';

let gulp = require('gulp');
const { series } = require('gulp');
let serve = require('gulp-serve');
let webpack = require('webpack');
let gutil = require('gulp-util');

gulp.task('serve', serve('dist'));
gulp.task('webpack', webpackFn);
gulp.task('serve-build', series('webpack', serve('dist')));

function webpackFn(cb) {
    const config = require('./webpack.config');
    webpack(config, (err, stats) => {
        if(err)  {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            chunks: false,
            errorDetails: true
        }));

        cb();
    });
}

// gulp.task('serve-prod', serve({
//     root: ['src'],
//     port: 80
// }));
