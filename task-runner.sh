#!/usr/bin/env bash

CI=true npm test -s -- --reporters='<rootDir>/src/tests/reporter.js' --noStackTrace --openHandlesTimeout=0 --no-cache $1 --testNamePattern=$2

# ./task-runner.sh src/tests/jest-cli.test.tsx @2.1       - file name with test name pattern
# ./task-runner.sh src/tests/testing-library@1.test.tsx   - file name without test name pattern

