/* eslint-disable no-plusplus */
const { task, src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
let count = 0;


task('dev', function () {
  return watch([ './src/**' ], function () {
    const dateVo = new Date();
    const dateOpt = { hour12: false };

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`[${dateVo.toLocaleString('zh', dateOpt)}]\t\tRebuilding...\t ${++count}`);

    return (
      src('./src/**')
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest('release'))
    );
  });
});
