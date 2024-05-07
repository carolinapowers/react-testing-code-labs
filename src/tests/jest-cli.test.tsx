import { packageJsonScripts, readFile } from "./helpers";

const file = readFile("package.json"); 
const scripts = packageJsonScripts(file) as any;

// npm run -s task -- --testNamePattern=@2.1
describe("Jest CLI task @2.1", () => {
  test('jest:test should exist', () => {
    expect(scripts['jest:test'], 'Make sure you are creating the script named "jest:test"').toBeDefined();
  });

  test('npm test --watchAll=false should exist', () => {
    expect(scripts['jest:test'], 'Make sure to assign "npm test -- --watchAll=false" to your `jest:test` script').toEqual('npm test -- --watchAll=false');
  });
});

// npm run -s task -- --testNamePattern=@2.2
describe("Jest CLI task @2.2", () => {
  test('test:ci should exist', () => {
    expect(scripts['test:ci'], 'Make sure you are creating the script named "test:ci"').toBeDefined();
  });

  test('CI=true npm test should exist', () => {
    expect(scripts['test:ci'], 'Make sure to assign "CI=true npm test" to your `test:ci` script').toEqual('CI=true npm test');
  });
});

// npm run -s task -- --testNamePattern=@2.3
describe("Jest CLI task @2.3", () => {
  test('test:ignore should exist', () => {
    expect(scripts['test:ignore'], 'Make sure you are creating the script named "test:ignore"').toBeDefined();
  });

  test("testPathIgnorePatterns='<rootDir>/src/tests/.*.test.tsx'should exist", () => {
    expect(scripts['test:ignore'], `Make sure your package.json has an "test:ignore": "npm test -- --watchAll=false --testPathIgnorePatterns='<rootDir>/src/tests/.*.test.tsx'"`).toEqual("npm test -- --watchAll=false --testPathIgnorePatterns='<rootDir>/src/tests/.*.test.tsx'");
  });
});

// npm run -s task -- --testNamePattern=@2.4
describe("Jest CLI task @2.4", () => {
  test('test:name:pattern should exist', () => {
    expect(scripts['test:name:pattern'], 'Make sure you are creating the script named "test:name:pattern"').toBeDefined();
  });

  test("npm test -- --watchAll=false --testNamePattern='...' should exist", () => {
    expect(scripts['test:name:pattern'], `Make sure your package.json has an "test:name:pattern": "npm test -- --watchAll=false --testNamePattern='name pattern correctly'"`).toEqual("npm test -- --watchAll=false --testNamePattern='name pattern correctly'");
  });
});

