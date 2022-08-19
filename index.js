const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

function menuofapp() {
  function leadermake() {
    console.log('choose your fighters ');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "name",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'enter something.';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: "id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'actual number pls';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "email",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "office #",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'igh numbr=e pls.';
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createfighters();
      });
  }

  function createfighters() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'what memerb will be added today',
          choices: [
            'Engineeredf',
            'Internsd',
            "no more",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            personwithexperince();
            break;
          case 'Intern':
            addnewbie();
            break;
          default:
            buildcomapny();
        }
      });
  }

  function personwithexperince() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: "name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'pls enter.';
          },
        },
        {
          type: 'input',
          name: 'engineerId',
          message: "id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'error new.';
              } else {
                return true;
              }
            }
            return 'number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: "engineer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: "GitHub username?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter character.';
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createfighters();
      });
  }

  function addnewbie() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "What is your intern's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: "What is your intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'This ID is already taken. Please enter a different number.';
              } else {
                return true;
              }
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "What is your intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'internSchool',
          message: "What is your intern's school?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createfighters();
      });
  }

  function buildcomapny() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  leadermake();
}

menuofapp();
