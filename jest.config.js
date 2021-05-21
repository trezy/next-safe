/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// An array of directory names to be searched recursively up from the requiring module's location
	moduleDirectories: ['node_modules', 'shared'],

	// An array of file extensions your modules use
	moduleFileExtensions: ['js'],

	// A list of paths to modules that run some code to configure or set up the testing framework before each test
	setupFilesAfterEnv: [],
};
