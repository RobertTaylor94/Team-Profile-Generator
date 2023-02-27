const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

let employees = [];

function init() {
    inquirer
        .prompt([
            {
                type: `input`,
                message: `Enter the team managers name.`,
                name: `managerName`
            },
            {
                type: `input`,
                message: `Enter the team managers ID.`,
                name: `managerId`
            },
            {
                type: `input`,
                message: `Enter the team managers email.`,
                name: `managerEmail`
            },
            {
                type: `input`,
                message: `Enter the team managers office number.`,
                name: `managerOfficeNum`
            }
        ])
        .then((answers) => {
            const teamManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum);
            employees.push(teamManager);
            options()
        })
}

function addEngineer() {
    inquirer 
        .prompt([
            {
                type: `input`,
                message: `Enter the engineers name.`,
                name: `name`
            },
            {
                type: `input`,
                message: `Enter the team members ID.`,
                name: `id`
            },
            {
                type: `input`,
                message: `Enter the team members email.`,
                name: `email`
            },
            {
                type: `input`,
                message: `Enter the engineers GitHub username.`,
                name: `github`
            }
        ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer);
            options();
        })
    }

function addIntern() {
    inquirer 
        .prompt([
            {
                type: `input`,
                message: `Enter the interns name.`,
                name: `name`
            },
            {
                type: `input`,
                message: `Enter the interns ID.`,
                name: `id`
            },
            {
                type: `input`,
                message: `Enter the interns email.`,
                name: `email`
            },
            {
                type: `input`,
                message: `Enter the interns school.`,
                name: `school`
            }
        ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(intern);
            options();
        })
}

function options() {
    inquirer
        .prompt([
            {
                type: `list`,
                message: `Next:`,
                choices: [`Add new engineer`, `Add new intern`, `Finish building the team`],
                name: `option`
            }
        ])
        .then((answer) => {
            if (answer.option === `Add new engineer`) {
                addEngineer();
            } else if (answer.option === `Add new intern`) {
                addIntern();
            } else {
                const html = render(employees);
                fs.writeFile(outputPath, html, (err) => {
                    if (err) {console.error(err);}
                });
            }
        })
}

init();