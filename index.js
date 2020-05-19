const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");

inquirer.prompt([
    {
        type: 'input',
        name: 'username',
        message: 'What is your github username?'
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is your title for this Project?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'How would you describe this project?'
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Choose a license',
        default: 'MIT',
        choices: [
            'Apache 2.0',
            'MIT',
            'GNU GPL v3.0'
        ]
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How do you install this application?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe the usage of this application'
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Who all contributed to this project?'
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Do you have any questions?'
    }

]).then(function(data) {
    axios
    .get(`https://api.github.com/users/${data.username}`)
    .then(function(res) {
        console.log(data.license)
        const getLicense = (license) => {
            if (license === 'MIT'){
                return  `\r[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`; 
            } else if (license === 'GNU GPL v3.0') {
                return `\r[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
            } else if (license === 'Apache 2.0') {
                return `\r[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`; 
            }
        }
    
        const readMe = `
## ${data.title}
## ${getLicense(data.license)}
## ${data.username} | ${data.email}
## ![img](${res.data.avatar_url})
## Table of Contents
1. Description
2. Installation
3. Usage
4. Contributors
5. Questions
# Description
${data.description}
# Installation
${data.installation}
# Usage
${data.usage}
# Contributors
${data.contributors}
# Questions
${data.questions}`
      fs.writeFile('README.md', readMe, (err) => {
        if (err) {
            throw err;
        }
    });
    });
});