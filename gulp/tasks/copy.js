const gulp = require('gulp');
const config = require('../config.js');

gulp.task('copy:fonts', function() {
  return gulp
    .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
    .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:data', function() {
  return gulp
    .src(config.src.data + '/**/*.*')
    .pipe(gulp.dest(config.dest.data));
});

gulp.task('copy:lib', function() {
  return gulp.src(config.src.lib + '/**/*.*').pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function() {
  return gulp.src(config.src.root + '/*.*').pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,ico}',
      '!' + config.src.img + '/svgo/**/*.*',
    ])
    .pipe(gulp.dest(config.dest.img));
});
gulp.task('copy:pic', function() {
  return gulp
    .src([
      config.src.pic + '/**/*.{jpg,png,jpeg,svg,gif,ico}',
      '!' + config.src.pic + '/svgo/**/*.*',
    ])
    .pipe(gulp.dest(config.dest.pic));
});
gulp.task('copy:video', function() {
  return gulp
    .src([config.src.video + '/*.{mp4,webm,mov}'])
    .pipe(gulp.dest(config.dest.video));
});

gulp.task('copy', [
  'copy:img',
  'copy:pic',
  'copy:video',
  'copy:rootfiles',
  // 'copy:lib',
  // 'copy:data',
  'copy:fonts',
]);
gulp.task('copy:watch', function() {
  gulp.watch(config.src.img + '/*', ['copy']);
});
