import ecomJourneyElements from "../../elements/ecom/webPage";
const EcomJourneyElements = new ecomJourneyElements

class ecomJourney {

	checkComponents() {
		cy.visit('/');
		cy.get(EcomJourneyElements.checkImgPage()).should('be.visible');
	}

	acceptCookies() {
		cy.get(EcomJourneyElements.cookiesButton()).should('be.visible').click();
	}

	startJourney() {
		cy.wait(5000)
		cy.get(EcomJourneyElements.startJourneyButton()).should('be.visible').click();
	}

	typeUser(user) {
		cy.get(EcomJourneyElements.userNameField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.userNameField()).type(user);
	}

	clickBtnContinue() {
		cy.get(EcomJourneyElements.continueButton()).contains('Continuar').click();
	}

	clickContinueOk() {
		cy.get(EcomJourneyElements.continueOkButton()).contains('Continuar').click();
	}

	clickFillManual() {
		cy.get(EcomJourneyElements.fillManualButton()).should('be.visible').click();
	}

	typeName(name) {
		cy.get(EcomJourneyElements.fullNameClientField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.fullNameClientField()).type(name);
	}

	typeWhatsApp(wpp) {
		cy.get(EcomJourneyElements.phoneClientField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.phoneClientField()).type(wpp);
	}

	typeEmail(email) {
		cy.get(EcomJourneyElements.emailClientField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.emailClientField()).type(email);
	}

	clickNext(nextPage) {
		cy.get(EcomJourneyElements.nextButton()).contains(nextPage).parent('button').should('be.visible').should('not.be.disabled').click();
	}

	typeBillValue(billValue) {
		cy.get(EcomJourneyElements.billValueField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.billValueField()).type(billValue);
	}

	typeCity(city) {
		cy.get(EcomJourneyElements.cityField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.cityField()).type(city);
		cy.get(EcomJourneyElements.cityField())
			.parents('div.relative.text-jn-input')
			.find('div.absolute.z-10')
			.should('be.visible')
			.contains(city)
			.click();
	}

	typeEnergyCompany(energyCompany) {
		cy.get(EcomJourneyElements.energyCompanyField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.energyCompanyField()).type(energyCompany);
		cy.get(EcomJourneyElements.energyCompanyField())
			.parents('div.relative.text-jn-input')
			.find('div.absolute.z-10')
			.should('be.visible')
			.contains(energyCompany)
			.click();
	}

	checkManualSimulation() {
		cy.get(EcomJourneyElements.manualSimulationTab()).should('be.visible')
	}

	clickUploadFileButton(invoice) {
		cy.get(EcomJourneyElements.uploadFileButton())
			.attachFile({
				filePath: `${invoice}`, 		// Caminho do arquivo
				// mimeType: 'application/pdf',    // MIME type
				encoding: 'binary',             // Codificação apropriada
			});
	}

	typeCnpj(cnpj) {
		cy.get(EcomJourneyElements.cnpjField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.cnpjField()).type(cnpj);
	}

	typeCompanyName(companyName) {
		cy.get(EcomJourneyElements.companyNameField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.companyNameField()).type(companyName);
	}

	typeFantasyName(fantasyName) {
		cy.get(EcomJourneyElements.fantasyNameField()).should('be.visible').clear();
		cy.get(EcomJourneyElements.fantasyNameField()).type(fantasyName);
	}

	checkContinueButton(nextPage, condition) {
		if (condition == 'disable') {
			cy.get(EcomJourneyElements.nextButton()).contains(nextPage).parent('button').should('be.visible').should('have.attr', 'disabled');
		}
		else cy.get(EcomJourneyElements.nextButton()).contains(nextPage).parent('button').should('be.visible').should('not.be.disabled')
	}

	scrollToBottom() {
		cy.get(EcomJourneyElements.modalContent())
			.find('div:nth-child(2) > div > div:nth-child(1)')
			.should('be.visible')
			.scrollTo('bottom');
	}

	clickToAddRepresentative() {
		cy.get(EcomJourneyElements.representativeButton()).should('be.visible').click()
	}

	typeCpfRepresentative(cpf) {
		cy.get(EcomJourneyElements.cpfRepresentative()).should('be.visible').clear();
		cy.get(EcomJourneyElements.cpfRepresentative()).type(cpf);
	}

	typeBirthdayRepresentative(birthday) {
		cy.get(EcomJourneyElements.birthdayRepresentative()).should('be.visible').clear();
		cy.get(EcomJourneyElements.birthdayRepresentative()).type(birthday);
	}

	typeEmailRepresentative(email) {
		cy.get(EcomJourneyElements.emailRepresentative()).should('be.visible').clear();
		cy.get(EcomJourneyElements.emailRepresentative()).type(email);
	}

	typePhoneRepresentative(phone) {
		cy.get(EcomJourneyElements.phoneRepresentative()).should('be.visible').clear();
		cy.get(EcomJourneyElements.phoneRepresentative()).type(phone);
	}

	clickSaveButton() {
		cy.get(EcomJourneyElements.saveButton()).should('be.visible').click()
	}

	checkWaitingSign() {
		cy.get(EcomJourneyElements.waitingSign()).should('be.visible')
	}

	checkTrashIconVisible() {
		cy.wait(2000);
		cy.get('body', { timeout: 10000 }).then(($body) => {
			if ($body.find(EcomJourneyElements.trashIcon()).length > 0) {
				cy.get(EcomJourneyElements.trashIcon())
					.should('be.visible')
					.click();
				cy.get(EcomJourneyElements.nextButton()).contains('Sim').parent('button').should('be.visible').should('not.be.disabled').click();
				cy.wait(2000)
			} else {
				cy.log('Lixeira não encontrada, seguindo o fluxo...');
			}
		});
	}

	checkToastVisible() {
		cy.get('div.text-inherit')
			.should('be.visible')
			.within(() => {
				cy.get('p').then(($paragraphs) => {
					const texts = $paragraphs.map((_, el) => Cypress.$(el).text()).get();
					const expectedTexts = [
						'Contrato enviado',
						'Aguarde até que todos tenham assinado'
					];
					expect(texts).to.deep.equal(expectedTexts, 'Toast exibiu texto inesperado');
				});
			});
	}

	checkReviewData(reviewData) {
		cy.get(EcomJourneyElements.reviewCompanyAndAdressData()).contains(reviewData).should('be.visible').click()
	}

	clickOpenAccordionCompany() {
		cy.get(EcomJourneyElements.accordionCompany()).should('be.visible').click()
	}

	clickOpenAccordionAdress() {
		cy.get(EcomJourneyElements.accordionAdress()).should('be.visible').click()
	}
}
export default ecomJourney