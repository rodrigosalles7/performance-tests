import ecomJourney from "../../pageobjects/ecom/webPage"

const EcomJourney = new ecomJourney

Then("verify elements", () => {
	EcomJourney.checkComponents();
})
Then("accept cookies", () => {
	EcomJourney.acceptCookies();
})

When("click to start the journey", () => {
	EcomJourney.startJourney();
})

And("type {string} user", (user) => {
	EcomJourney.typeUser(user);
})

And("click in continue", () => {
	EcomJourney.clickBtnContinue();
})

And("click in continue ok", () => {
	EcomJourney.clickContinueOk();
})

And("click in manual filling", () => {
	EcomJourney.clickFillManual();
})

And("type {string} name", (name) => {
	EcomJourney.typeName(name);
})

And("type {string} whatsapp", (wpp) => {
	EcomJourney.typeWhatsApp(wpp);
})

And("type {string} email", (email) => {
	EcomJourney.typeEmail(email);
})

And("click in {string} next", (nextPage) => {
	EcomJourney.clickNext(nextPage);
})

And("type {string} bill value", (billValue) => {
	EcomJourney.typeBillValue(billValue);
})

And("type {string} city", (city) => {
	EcomJourney.typeCity(city);
})

And("type {string} energy company", (energyCompany) => {
	EcomJourney.typeEnergyCompany(energyCompany);
})

Then("check manual simulation", () => {
	EcomJourney.checkManualSimulation();
})

And("{string} upload file", (invoice) => {
	EcomJourney.clickUploadFileButton(invoice);
})

And("type {string} cnpj", (cnpj) => {
	EcomJourney.typeCnpj(cnpj);
})

And("type {string} companyName", (companyName) => {
	EcomJourney.typeCompanyName(companyName);
})

And("type {string} fantasyName", (fantasyName) => {
	EcomJourney.typeFantasyName(fantasyName);
})

And("scroll to bottom", () => {
	EcomJourney.scrollToBottom();
})

And("check {string} continue button {string}", (nextPage, condition) => {
	EcomJourney.checkContinueButton(nextPage, condition);
})

And("click in representative", () => {
	EcomJourney.clickToAddRepresentative();
})

And("type {string} cpf representative", (cpf) => {
	EcomJourney.typeCpfRepresentative(cpf);
})

And("type {string} birthday representative", (birthday) => {
	EcomJourney.typeBirthdayRepresentative(birthday);
})

And("type {string} email representative", (email) => {
	EcomJourney.typeEmailRepresentative(email);
})

And("type {string} phone representative", (phone) => {
	EcomJourney.typePhoneRepresentative(phone);
})

And("click in save button", () => {
	EcomJourney.clickSaveButton();
})

And("check waiting to sign", () => {
	EcomJourney.checkWaitingSign();
})

And("check if exist representative to delete", () => {
	EcomJourney.checkTrashIconVisible();
})

Then("check success toast", () => {
	EcomJourney.checkToastVisible();
})

And("click to open accordion company", () => {
	EcomJourney.clickOpenAccordionCompany()
})

And("click to open accordion adress", () => {
	EcomJourney.clickOpenAccordionAdress()
})