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


function appMenu() {
  function createManager() {
    console.log('BUILD YOUR CHAMPIONS');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: " name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'pls actually enter somthing man cjoqhedeq';
          },
        },
        {
          type: 'input',
          name: 'managerId',
          message: " id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'qefnkwjEFN PUT A NUMBER INQIEBFHeqbdiueqfi.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: " email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'email.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: " office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'qefnkwjEFN PUT A NUMBER INQIEBFHeqbdiueqfi.';
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
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'build your champion',
          choices: [
            'Engineer',
            'Intern',
            "i am done thanks",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'engineerName',
          message: " name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'pls actually enter somthing man cjoqhedeq';
          },
        },
        {
          type: 'input',
          name: 'engineerId',
          message: " id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'This ID is already taken. Please enter a different number.';
              } else {
                return true;
              }
            }
            return 'qefnkwjEFN PUT A NUMBER INQIEBFHeqbdiueqfi.';
          },
        },
        {
          type: 'input',
          name: 'engineerEmail',
          message: " email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'email.';
          },
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: " GitHub username?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'pls actually enter somthing man cjoqhedeq';
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
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: " name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'pls actually enter somthing man cjoqhedeq';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: " id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return 'This ID is already taken. Please enter a different number.';
              } else {
                return true;
              }
            }
            return 'qefnkwjEFN PUT A NUMBER INQIEBFHeqbdiueqfi.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: " email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'email.';
          },
        },
        {
          type: 'input',
          name: 'internSchool',
          message: " school?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'pls actually enter somthing man cjoqhedeq';
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
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}

appMenu();
