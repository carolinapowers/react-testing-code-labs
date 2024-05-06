import { packageJsonScripts, readFile } from "./helpers";

const file = readFile("package.json"); 
const scripts = packageJsonScripts(file) as any;

// npm run -s task -- --testNamePattern=@2.1
describe("Jest CLI task @2.1", () => {
  test('test:blind should exist', () => {
    expect(scripts['test:blind'], 'Make sure you are creating the script named "test:blind"').toBeDefined();
  });

  test('npm test --watchAll=false should exist', () => {
    expect(scripts['test:blind'], 'Make sure to assign "npm test -- --watchAll=false" to your `test:blind` script').toEqual('npm test -- --watchAll=false');
  });
});

// npm run -s task -- --testNamePattern=@2.2
describe("Jest CLI task @2.2", () => {
  test('test:ci should exist', () => {
    expect(scripts['test:ci'], 'Make sure you are creating the script named "test:ci"').toBeDefined();
  });

  test('CI=true npm test should exist', () => {
    expect(scripts['test:ci'], 'Make sure to assign "CI=true npm test" to your `test:blind` script').toEqual('CI=true npm test');
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
