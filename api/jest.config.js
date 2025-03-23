/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@/config/prisma$": "<rootDir>/src/config/__mocks__/prisma.ts",
  },
  modulePaths: ["<rootDir>"],

  preset: "ts-jest",
};