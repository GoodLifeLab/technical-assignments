/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  globals: {
    "ts-jest": {
      // Separate tsconfig for normal codes and for Jest codes.
      // https://github.com/kulshekhar/ts-jest/issues/937#issuecomment-509736680
      tsConfig: "tsconfig.test.json",
    },
  },
}
