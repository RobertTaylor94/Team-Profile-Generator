const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const validator = require("email-validator");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

let employees = [];

function init() {
    //get user input for manager employee
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
                name: `managerEmail`,
                validate: validateEmail
            },
            {
                type: `input`,
                message: `Enter the team managers office number.`,
                name: `managerOfficeNum`
            }
        ])
        .then((answers) => {
            //add manager object employees array
            const teamManager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum);
            employees.push(teamManager);
            //get user option for adding new employee
            options()
        })
}

function addEngineer() {
    //get user input for new engineer
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
                name: `email`,
                validate: validateEmail
            },
            {
                type: `input`,
                message: `Enter the engineers GitHub username.`,
                name: `github`
            }
        ])
        .then((answers) => {
            //add engineer to employee array
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            employees.push(engineer);
            //get user option for adding new employee
            options();
        })
    }

function addIntern() {
    //get user input for new intern
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
                name: `email`,
                validate: validateEmail
            },
            {
                type: `input`,
                message: `Enter the interns school.`,
                name: `school`
            }
        ])
        .then((answers) => {
            //push intern object to employees array
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            employees.push(intern);
            //get user option for adding new employee
            options();
        })
}

function options() {
    //ask user if they want to add a new employee or finish building the page
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
                //uses render function to build html page
                const html = render(employees);
                fs.writeFile(outputPath, html, (err) => {
                    if (err) {console.error(err);}
                });
            }
        })
}

function validateEmail(email) {
    //using the email-validator package, if email is valid move on to the next prompt
    if (validator.validate(email)) {
        return true;
    } else {
        console.log("Invalid email");
    };
}

init();