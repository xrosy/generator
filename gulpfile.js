/* eslint-disable no-plusplus */
const { task, src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
let count = 0;


function _Handler() {
}


function handler() {
  const dateVo = new Date();
  const dateOpt = { hour12: false };

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`[${dateVo.toLocaleString('zh', dateOpt)}]\t\tRebuilding...\t ${++count}`);

  return (
    src('./src/**')
      // .pipe(babel())
      // .pipe(uglify())
      // .pipe(concat('rox.js'))
      .pipe(dest('build'))
  );
}

task('dev', function () {
  return watch([ './src/**' ], handler);
});


exports.default = handler;
