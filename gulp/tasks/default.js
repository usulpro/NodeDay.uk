const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../config');

gulp.task('default', function(cb) {
  runSequence('build:dev', 'watch', 'server', cb);
});
