#!/usr/bin/env node

const CURR_DIR = process.cwd();
const inquirer = require('inquirer');
const fs = require('fs');

const setProjectName = () => [
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true;
      }
      return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const chooseDatabase = () => [
  {
    name: 'database',
    type: 'list',
    message: `Please select the database type:`,
    choices: [new inquirer.Separator(), 'mongo', 'postgres', new inquirer.Separator(), 'api', new inquirer.Separator()]
  }
];

const generateProject = (templatePath, projectPath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  for (let file of filesToCreate) {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      if (file === '.npmignore') {
        file = '.gitignore';
      }
      const writePath = `${CURR_DIR}/${projectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');

    } else if (stats.isDirectory()) {

      fs.mkdirSync(`${CURR_DIR}/${projectPath}/${file}`);
      generateProject(`${templatePath}/${file}`, `${projectPath}/${file}`);
    }
  }
};

inquirer.prompt(setProjectName())
  .then((answers) => new Promise((resolve, reject) => {
    inquirer.prompt(chooseDatabase())
      .then((newAnswer) => {
        resolve({ ...answers, ...newAnswer });
      })
      .catch((err) => reject(err));
  }))
  .then(answers => {
    const projectName = answers['projectName'];
    const templatePath = `${__dirname}/templates/${ answers['database'] }`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    generateProject(templatePath, projectName);
  })
  .catch((err) => console.error(err));


