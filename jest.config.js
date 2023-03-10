// @ts-check

/**
 * @type {import('jest').Config}
 **/
const jestConfig = {
  preset: 'ts-jest',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'shared'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [],
}

// eslint-disable-next-line no-undef
module.exports = jestConfig
