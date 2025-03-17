import type { Config } from "jest";


const config: Config = {
  rootDir: "./",
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.node.json",
      },
    ],
  },
  
};

export default config;

