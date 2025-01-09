// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';


Cypress.Commands.add("parseXlsx", (inputFile) => {
    return cy.task('parseXlsx', { filePath: inputFile })
});

Cypress.Commands.add("saveLocalStorage", () => {
    const data = JSON.stringify(window.localStorage);
    cy.writeFile('cypress/auth-' + Cypress.env('browser') + '-' + Cypress.env('device') + '/user.json', data)
});
Cypress.Commands.add("restoreLocalStorage", () => {
    cy.task('existFile', 'cypress/auth-' + Cypress.env('browser') + '-' + Cypress.env('device') + '/user.json').then((exist) => {
        if (exist == true) {
            cy.readFile('cypress/auth-' + Cypress.env('browser') + '-' + Cypress.env('device') + '/user.json').then((user) => {
                Object.keys(user).forEach(key => {
                    window.localStorage.setItem(key, user[key])
                })
            });
            cy.task('clearFile', 'cypress/auth-' + Cypress.env('browser') + '-' + Cypress.env('device'))
        }
    })
});

Cypress.Commands.overwrite('clearLocalStorage', (overrides = {}) => {
    window.localStorage.clear();
});

Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiBaseUrl')}/auth/login`,
        body: {
            username,
            password
        }
    }).then((response) => {
        const token = response.body.accessToken;
        cy.window().then((window) => {
            window.localStorage.setItem('accessToken', token);
        });
    });
});