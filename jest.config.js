module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
        "node_modules/?!(react-router)"
    ],
    setupFiles: ['./jestSetup.js'],
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    }
  };