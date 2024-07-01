module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transform: {
    "^.+\\.(ts|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "tsconfig.spec.json",
        stringifyContentPathRegex: "\\.html$",
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@environments/(.*)$": "<rootDir>/src/environments/$1",
    "^lodash-es$": "lodash",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  roots: ["<rootDir>/src/"],
};
