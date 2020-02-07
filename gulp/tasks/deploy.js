const gulp = require('gulp');
const ftp = require('vinyl-ftp');
const minimist = require('minimist');
const gutil = require('gulp-util');
const args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
  const remotePath = '/';
  const conn = ftp.create({
    /* TODO: set deploying credentials */
    // host: 'buff.elastictech.org',
    // user: args.user,
    // password: args.password,
    log: gutil.log,
    parallel: 10,
  });

  gulp.src(['./build/**/*.*']).pipe(conn.dest(remotePath));

  gulp
    .src(['./sponsors/**/*.*', '!./sponsors/node_modules/**/*.*'])
    .pipe(conn.dest(`${remotePath}/sponsors`));

  // uncomment to deploy last year versions
  // gulp.src([
  //   './2018/**/*.*'
  // ])
  //   .pipe(conn.dest(`${remotePath}/2018`));
  //
  // gulp.src([
  //   './2017/**/*.*'
  // ])
  //   .pipe(conn.dest(`${remotePath}/2017`));
});
