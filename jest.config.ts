export default module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Set the test environment to jsdom
  jest: {
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  },
};
