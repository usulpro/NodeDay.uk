const path = require('path');
const gulp = require('gulp');
const map = require('map-stream');
const chalk = require('chalk');

const { SnapshotState, toMatchSnapshot } = require('jest-snapshot');

function snapshotProcess(actual, testFile, testTitle) {
  // Intilize the SnapshotState, it's responsible for actually matching
  // actual snapshot with expected one and storing results to `__snapshots__` folder
  const arg = process.argv[3];
  const isUpdate = arg === '-u' || arg === '--updateSnapshot';
  const snapshotState = new SnapshotState(testFile, {
    updateSnapshot: isUpdate ? 'all' : 'new',
  });

  // Bind the `toMatchSnapshot` to the object with snapshotState and
  // currentTest name, as `toMatchSnapshot` expects it as it's `this`
  // object members
  const matcher = toMatchSnapshot.bind({
    snapshotState,
    currentTestName: testTitle,
  });

  // Execute the matcher
  const result = matcher(actual);

  const { added, expand, matched, updated } = snapshotState;
  snapshotState.save();

  // Return results outside
  return { ...result, added, updated, matched, expand };
}

function snapshotFile(filePath) {
  const { name, ext } = path.parse(filePath);
  return path.resolve(__dirname, '__snapshots__', `${name}${ext}.js.snap`);
}

function expect(file) {
  const test = () => {
    const content = file._contents.toString();
    const snapshotName = snapshotFile(file.path);
    const fileTile = file.path;
    const result = snapshotProcess(content, snapshotName, fileTile);

    const { dir, base } = path.parse(file.path);
    if (!result.pass) {
      console.error(`${chalk.red('Failed:')} ${dir}/${chalk.yellow(base)}`);
      throw result;
    }
    if (result.added) {
      console.log(
        `${chalk.yellow('Added:')} ${dir}/${chalk.yellow(base)}`,
        result.message()
      );
      return;
    }
    if (result.updated) {
      console.log(
        `${chalk.cyan('Updated:')} ${dir}/${chalk.yellow(base)}`,
        result.message()
      );
      return;
    }
    console.log(
      `${chalk.green('Pass:')} ${dir}/${chalk.yellow(base)}`,
      result.message()
    );
  };
  return { toMatchSnapshot: test };
}

const failedTests = [];

const check = function(file, cb) {
  try {
    expect(file).toMatchSnapshot();
  } catch (result) {
    failedTests.push(result);
  }
  cb(null, file);
};

const snapshotTest = map(check);

function test(cb) {
  console.log(chalk.gray('\nSnapshot tests:\n'));
  const task = gulp.src('build/*.html').pipe(snapshotTest);
  task.on('end', () => {
    if (failedTests.length) {
      failedTests.forEach((result, ind) =>
        console.error(chalk.gray(`\n [${ind}]: `), result.report(), '\n')
      );
      throw new Error(
        `\nThere are ${failedTests.length} failed snapshot tests`
      );
    }
    console.log(chalk.gray('\nAll snapshot tests passed!\n'));
    cb();
  });
}

gulp.task('test', test);
