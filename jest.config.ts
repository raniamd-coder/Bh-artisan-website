import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.test.{ts,tsx}",
    "**/src/**/*.test.{ts,tsx}",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(jose)/)",
  ],
};

export default createJestConfig(config);
