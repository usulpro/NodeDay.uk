const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const config = require('../config');

gulp.task('svgo', function() {
  return gulp
    .src(config.src.img + '/svgo/**/*.svg')
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(changed(config.dest.img))
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
        plugins: [
          {
            removeDesc: true,
          },
          {
            cleanupIDs: true,
          },
          {
            mergePaths: false,
          },
        ],
      })
    )
    .pipe(gulp.dest(config.dest.img));
});

gulp.task('svgo:watch', function() {
  gulp.watch(config.src.img + '/svgo/**/*.svg', ['svgo']);
});
