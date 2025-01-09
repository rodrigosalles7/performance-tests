/// <reference types="cypress" />

class apiEcomJourney {

	// checkGroupsAvailable() {
	// 	var url_request = `${Cypress.env('apiBaseUrl')}` + '/managers/groups'
	// 	var status_code = 200
	// 	var auth = `Bearer ${window.localStorage.getItem('accessToken')}`

	// 	cy.request({
	// 		method: 'GET',
	// 		url: url_request,
	// 		headers: {
	// 			'Authorization': auth
	// 		},
	// 		failOnStatusCode: false,
	// 	}).then((response) => {
	// 		expect(response.status).to.equal(status_code)
	// 	})
	// }

	// sendThumbImg(imageName) {
	// 	var url_request = `${Cypress.env('apiBaseUrl')}/files/public`;
	// 	var status_code = 201;
	// 	var auth = `Bearer ${window.localStorage.getItem('accessToken')}`;

	// 	cy.fixture(imageName, 'binary').then((imageData) => {
	// 		const blob = Cypress.Blob.binaryStringToBlob(imageData, 'image/png');
	// 		const formData = new FormData();
	// 		formData.append('file', blob, imageName);
	// 		formData.append('extractionType', 'yourExtractionType');

	// 		cy.request({
	// 			method: 'POST',
	// 			url: url_request,
	// 			headers: {
	// 				'Authorization': auth
	// 			},
	// 			body: formData,
	// 			failOnStatusCode: false,
	// 		}).then((response) => {
	// 			var ab2str = require('arraybuffer-to-string');
	// 			const stringsDecoded = ab2str(response.body, 'iso-8859-2');
	// 			expect(response.status).to.equal(status_code);
	// 			const regex = /(https:\/\/[^\s]+\.png)/g;
	// 			const matches = stringsDecoded.match(regex);
	// 			if (matches && matches.length > 0) {
	// 				const linkThumb = matches[0];
	// 				cy.wrap(linkThumb).as('linkThumb');
	// 			} else {
	// 				throw new Error('Link não encontrado no response');
	// 			}
	// 		});
	// 	});
	// }

	// saveParams() {
	// 	var url_request = `${Cypress.env('apiBaseUrl')}` + '/affiliates/default-revenue-params'
	// 	var status_code = 200;
	// 	var auth = `Bearer ` + window.localStorage.getItem('accessToken')
	// 	cy.request({
	// 		method: 'PATCH',
	// 		url: url_request,
	// 		headers: {
	// 			'Authorization': auth
	// 		},
	// 		body: {
	// 			bonusByCustomerFirstSpend: 0,
	// 			bonusByCustomerTotalSpent: 0,
	// 			bonusLeadCaptured: 0,
	// 			percentageBonusAffiliateInvited: 0,
	// 			revenueParameter: 10,
	// 			revenueScheme: "GGR",
	// 			targetCustomerFirstSpend: 0,
	// 			targetCustomerTotalSpent: 0,
	// 		},
	// 		failOnStatusCode: false,
	// 	}).then((response) => {
	// 		expect(response.status).to.equal(status_code)
	// 		expect(['null', '']).to.not.include(response.body)
	// 	})
	// }

}
export default apiEcomJourney;