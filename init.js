const inquirer = require('inquirer');

/**
 * @exports init
 */
module.exports = init;

/**
 * @function init
 * @param {Object} appDetails
 * @returns {Promise}
 * @description Entry point for creating a new app with the template
 */
async function init(appDetails) {
	// Create template config with defaults
	const config = {
		libraryName: appDetails.appName,
		mainJs: './src/main.ts',
		globals: {
			apex: 'apex'
		},
		srcFolder: './src',
		distFolder: './build',
		external: ['apex'],
		cssExtensions: [],
		version: '1.0.0'
	};

	// Ask questions
	const answers = await inquirer.prompt(getTemplateQuestions(appDetails));

	// Set main answers
	config.libraryName = answers['library-name'];

	return config;
}

/**
 * @private
 */
function getTemplateQuestions(appDetails) {
	return [
		{
			name: 'library-name',
			type: 'input',
			message: 'Library name:',
			default: appDetails.appName,
			validate: input => {
				if (/^([A-Za-z\d])+$/.test(input)) {
					return true;
				}

				return 'The library name may only include letters and numbers.';
			}
		}
	];
}
