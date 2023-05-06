function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`README file "${fileName}" has been saved.`);
  });
}


const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

async function init() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please provide a short description of your project:',
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Please provide the installation instructions for your project:',
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Please provide the usage information for your project:',
      },
      {
        type: 'input',
        name: 'contributors',
        message: 'Please provide the guidelines for contributing to your project:',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Please provide the testing instructions for your project:',
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub username?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
      },
      {
        type: 'list',
        name: 'license',
        message: 'Which license would you like to use for your project?',
        choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None'],
      },
    ]);

    const readme = generateREADME(answers);
    await writeFileAsync('README.md', readme);
    console.log('Successfully generated README.md');
  } catch (err) {
    console.error(err);
  }
}

function generateREADME(answers) {
  return `
# ${answers.title}

${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## Contributors

${answers.contributors}

## Tests

${answers.tests}

## License

This project is licensed under the ${answers.license} license.

## Questions

If you have any questions, please feel free to contact me:

* GitHub: https://github.com/${answers.githubUsername}
* Email: ${answers.email}
`;
}

init();