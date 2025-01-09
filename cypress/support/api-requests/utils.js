/// <reference types="cypress" />

class utils {

	defaultAPIConfig(method, endpoint, body_request, auth, baseUrl) {
		var url = `${Cypress.env('apiBaseUrl')}` + endpoint
		if (baseUrl == 'data-loader')
			url = `${Cypress.env('apiBaseUrlSeries')}` + endpoint
		else if (baseUrl == 'modelingAPI')
			url = `${Cypress.env('modelingAPIBaseurl')}` + endpoint

		cy.api({
			method: method,
			url: url,
			headers: {
				'Authorization': auth
			},
			body: body_request,
			failOnStatusCode: false
		}).then((response) => {
			cy.wrap(response).as('responseBody')
		})
	}
}
export default utils;