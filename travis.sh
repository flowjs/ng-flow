#!/bin/bash

set -e

if [ $TEST = "unit-tests" ]; then
  echo "Running unit-tests"
  grunt karma:coverage
  CODECLIMATE_REPO_TOKEN=9fcd24bf39f62bd186255d37ee66d0b1aaca8be7ea6616f074dd6c06a86720ab codeclimate-test-reporter < coverage/*/lcov.info

elif [[ $TEST = "browser-tests" ]]; then

  echo "Running browser-tests"
  grunt karma:saucelabs

fi
