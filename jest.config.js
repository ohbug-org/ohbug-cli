module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testMatch: ["**/__tests__/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePathIgnorePatterns: ["node_modules", "dist"],
  coveragePathIgnorePatterns: ["node_modules", "dist"],
  collectCoverageFrom: ["**/*.ts", "!**/node_modules/**", "!**/index.ts", "!**/types.ts"],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverage: true,
  verbose: true,
};
