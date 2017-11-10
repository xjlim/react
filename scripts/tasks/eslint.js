/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const execFileSync = require('child_process').execFileSync;
const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine();
const formatter = cli.getFormatter();

const isLintChanged = process.argv[2] === 'changed';
const report = cli.executeOnFiles(isLintChanged ? getChangedFiles() : ['.']);
console.log(formatter(report.results));

if (isLintChanged) {
  handleResultForLintChanged();
} else {
  handleResultForLint();
}

function handleResultForLint() {
  if (report.warningCount > 0 || report.errorCount > 0) {
    console.log('Lint failed.');
    process.exit(1);
  } else {
    console.log('Lint passed.');
  }
}

function handleResultForLintChanged() {
  if (report.errorCount > 0) {
    console.log('Lint failed for changed files.');
    process.exit(1);
  } else {
    console.log('Lint passed for changed files.');
  }
}

function getChangedFiles() {
  const mergeBase = execFileSync('git', ['merge-base', 'HEAD', 'master'], {
    stdio: 'pipe',
    encoding: 'utf-8',
  }).trim();
  const changedFiles = execFileSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase],
    {
      stdio: 'pipe',
      encoding: 'utf-8',
    }
  )
    .trim()
    .toString()
    .split('\n');
  return changedFiles.filter(file => file.match(/.js$/g));
}
