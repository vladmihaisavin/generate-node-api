#!/usr/bin/env node

const CURR_DIR = process.cwd();
const inquirer = require('inquirer');
const fs = require('fs');

const QUESTIONS = [
  {
    name: 'project-name',
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

inquirer.prompt(QUESTIONS)
  .then(answers => {
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/template`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    generateProject(templatePath, projectName);
  });


