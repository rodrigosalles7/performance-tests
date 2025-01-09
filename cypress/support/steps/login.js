/* global Given, Then, When */

// import loginElements from '../elements/login'
// const LoginElements = new loginElements

import loginEcomJourney from '../pageobjects/login'
const LoginEcomJourney = new loginEcomJourney

const {
	Before,
	// After
} = require("cypress10-cucumber-preprocessor/steps");

Before(() => {
	cy.restoreLocalStorage();
});
// After(() => {
// 	cy.saveLocalStorage();
// });

When("insert {string} credentials and login via {string}", (userType, loginMode) => {
	if (loginMode == 'UI') {
		if (window.localStorage.getItem('user') != userType) {
			LoginEcomJourney.initialPage()
			LoginEcomJourney.loginUI(userType, LoginElements.emailTextField(), LoginElements.passwordTextField(), LoginElements.signInButton())
		}
		else
			cy.visit('/')
	}

	else if (loginMode == 'API') {
		LoginEcomJourney.manageLogin(userType);
	}
})