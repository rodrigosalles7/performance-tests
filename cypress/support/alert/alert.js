/// <reference types="Cypress" />

class alert {

	defaultAPIConfig() {

		var body_request = {
			"@type": "MessageCard",
			"title": "Status Regressão Ecom"
		}

		cy.api({
			method: 'POST',
			url: `https://4iholding.webhook.office.com/webhookb2/fc8ac941-0fbd-456c-a00f-4151dacec3eb@7d9e02ea-7954-4806-be98-52607772498f/IncomingWebhook/26bd4a7c42de4a61b13b74d3bef1ebef/1f095196-a730-4b94-8b71-fdeaed767e46`,
			headers: {},
			body: body_request,
			failOnStatusCode: false
		})
	}
}
export default alert;