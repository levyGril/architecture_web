/**
 * Created by levy on 2018/5/27.
 */
const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup'); // 作用tree shaking

// rollup.config.js -- Replace strings in files while bundling them.
const replace = require('rollup-plugin-replace');

// Run a series of gulp tasks in order.
const gulpSequence = require('gulp-sequence');

gulp.task("buildDev",  ()=> {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('./src/serverII/**/*.js', { ignoreInitial: false },()=> {
        gulp.src('./src/serverII/**/*.js')
            .pipe(babel(
                {
                    // Babel 会在正在被转录的文件的当前目录中查找一个 .babelrc 文件。 如果不存在，它会遍历目录树，直到找到一个 .babelrc 文件
                    babelrc:false, // 在选项中使用 "babelrc": false 来停止查找行为
                    "plugins": [
                        "transform-es2015-modules-commonjs",
                        "transform-decorators-legacy"
                    ]
                }
            ))
            .pipe(gulp.dest('dist'));
    });
});

// 生产环境不用watch
gulp.task("buildProd",  ()=> {
    gulp.src('./src/serverII/**/*.js')
        .pipe(babel(
            {
                // Babel 会在正在被转录的文件的当前目录中查找一个 .babelrc 文件。 如果不存在，它会遍历目录树，直到找到一个 .babelrc 文件
                babelrc:false, // 在选项中使用 "babelrc": false 来停止查找行为
                ignore:["./src/serverII/config/*.js"],
                "plugins": [
                    "transform-es2015-modules-commonjs",
                    "transform-decorators-legacy"
                ]
            }
        ))
        .pipe(gulp.dest('dist'));
});

//rollup 配置文件,  开启清洗流
gulp.task('buildConfig', function() {
    gulp.src('./src/serverII/**/*.js')
    // transform the files here.
        .pipe(rollup({
            // any option supported by Rollup can be set here.
            input: './src/serverII/config/index.js',
            output: {
                format: 'cjs'
            },
            plugins:[
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]

        }))
        .pipe(gulp.dest('./dist'));
});

let _task = ["buildDev"];

// 因为rollup
if(process.env.NODE_ENV == "production"){
    _task = gulpSequence(["buildProd", "buildConfig"]);
}

gulp.task("default",_task);
