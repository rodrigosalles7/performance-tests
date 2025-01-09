/// <reference types="cypress" />

class loginEcomJourney {

	manageLogin(userType) {
		if (userType == 'admin') {
			cy.clearLocalStorage().login(Cypress.env('admin_user'), Cypress.env('admin_pwd'))
		}
	}

	accessMainPage() {
		cy.visit('/')
	}
}
export default loginEcomJourney;
