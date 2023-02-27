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

// let addEmployee = true;
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

}

function addIntern() {

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
                console.log(`Added new engineer`);
                options()
            } else if (answer.option === `Add new intern`) {
                console.log(`Added new intern`);
                options();
            } else {
                console.log("done");
            }
        })
}

init();