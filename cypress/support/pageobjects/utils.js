
import loginScenariosElements from '../elements/login'

const LoginScenariosElements = new loginScenariosElements
const path = require('path')
class utils {

	checkDownloadButton(downloadButton, comparationSize) {
		const downloadsFolder = Cypress.env('download_path') + '/' + Cypress.env('device') + '/' + Cypress.browser.name
		cy.task('clearFile', downloadsFolder)
		cy.task('createDownloadFolder', Cypress.env('download_path'))

		if (Cypress.browser.name !== 'firefox') {
			cy.wrap(
				Cypress.automation('remote:debugger:protocol',
					{
						command: 'Page.setDownloadBehavior',
						params: { behavior: 'allow', downloadPath: downloadsFolder },
					}),
				{ log: false }
			)
		}

		//check if file is greather than comparationSize declared at BDD
		cy.get(downloadButton).click()
		cy.log(downloadsFolder, "CheckDownload")
		cy.task('findFile', downloadsFolder, { timeout: 90000 }).then((downloadedFilename) => {
			cy.readFile(downloadedFilename, 'binary', { timeout: 90000 }).should((buffer) => {
				expect(buffer.length).to.be.gt(comparationSize)
			})
			cy.log('**the file exists and is valid**')
		});
		cy.task('clearFile', downloadsFolder)
	}

	concatVariable(value) {
		value = value + Cypress.env('browser')
		return value
	}

	checkInfoDownloadButton(downloadButton, column, value) {
		const downloadsFolder = Cypress.env('download_path') + '/' + Cypress.env('device') + '/' + Cypress.browser.name
		cy.task('clearFile', downloadsFolder)
		cy.task('createDownloadFolder', Cypress.env('download_path'))

		//import path from .env and click to export button
		if (Cypress.browser.name !== 'firefox') {
			cy.wrap(
				Cypress.automation('remote:debugger:protocol',
					{
						command: 'Page.setDownloadBehavior',
						params: { behavior: 'allow', downloadPath: downloadsFolder },
					}),
				{ log: false }
			)
		}

		cy.get(downloadButton).click()
		cy.log(downloadsFolder, "checkInfo")
		cy.task('findFile', downloadsFolder, { timeout: 15000 }).then((downloadedFilename) => {
			cy.task('readXlsx', { file: downloadedFilename, sheet: "Sheet1" }).then((rows) => {
				cy.writeFile(downloadsFolder + "/xlsxData.json", { rows })
			})
			cy.readFile(downloadsFolder + "/xlsxData.json").then((data) => {
				for (let index = 0; index < data.rows.length; index++) {
					Object.keys(data.rows[index]).forEach(key => {
						if (key == column && data.rows[index][key] == value) {
							expect(true).to.be.true
						}
					})
				}
			});
			cy.log('**the file exists and is valid**')
		});
		cy.task('clearFile', downloadsFolder)
	}

	fieldFill(input, field) {
		if (field == 'ProjectName') {
			if (input == 'DoNotFill') {
				cy.get(Step1Elements.insertProjectName()).clear()
			}
			//Type a name with 54 characters. It should be possible to type only 50
			if (input == 'GiantName') {
				cy.get(Step1Elements.insertProjectName()).type('GiantNameGiantNameGiantNameGiantNameGiantNameGiantName') //55 characters
			}
			else {
				cy.get(Step1Elements.insertProjectName()).type(input)
			}
		}
	}

	clickSlider(element, rcSliderElement, step) {
		cy.get(element).should('be.visible').then($initialSlider => {
			cy.get($initialSlider).trigger("mousedown", { button: 0 });
			cy.get(rcSliderElement).should('be.visible').then($endSlider => {
				if ($endSlider.length > 1)
					cy.get($endSlider.eq(step - 1)).trigger("mousemove");
			})
		})
		cy.get(element).trigger("mouseup", { button: 0 });
	}
}
export default utils;