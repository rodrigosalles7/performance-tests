#!/usr/bin/env node
/**
 * This script is executed by the 'yarn report' step and augments the cucumber report 
 * files of failed features with screenshots and snapshots. Mechanism was inspired by:
 * https://github.com/jcundill/cypress-cucumber-preprocessor/blob/master/fixJson.js
 * It also leverages the multiple-cucumber-html-reporter library to generate a HTML 
 * report based on the augmented cucumber report files.
 */

const report = require('multiple-cucumber-html-reporter')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv');
const fetch = require('node-fetch')

dotenv.config();

const cucumberJsonDir = 'cypress/test-results/cucumber-json'
const cucumberReportFileMap = {}
const cucumberReportMap = {}
const jsonIndentLevel = 2
const htmlReportDir = 'cypress/test-results/html'
const screenshotsDir = 'cypress/screenshots'
const snapshotDir = 'cypress/snapshots'

getCucumberReportMaps()
addScreenshots()
generateReport()
if (process.env.BROWSER == "chrome" && process.env.LOCAL_TEST != 'local' && process.env.IS_CI != 'CI') {
	generateAlert()
}

function getCucumberReportMaps() {
	const files = fs.readdirSync(cucumberJsonDir).filter(file => {
		return file.indexOf('.json') > -1
	})
	files.forEach(file => {
		const json = JSON.parse(
			fs.readFileSync(path.join(cucumberJsonDir, file))
		)
		if (!json[0]) { return }
		const [feature] = json[0].uri.split('/').reverse()
		cucumberReportFileMap[feature] = file
		cucumberReportMap[feature] = json
	})
}

function addScreenshots() {
	/* Credits: 
	https://gist.github.com/kethinov/6658166#gistcomment-3178557
	https://gist.github.com/Phenomite/038c57cdaf95b8b8383a0fd522919662
  */
	// Prepend the given path segment
	const prependPathSegment = pathSegment => location => path.join(pathSegment, location)
	// fs.readdir but with relative paths
	const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location))
	// Recursive fs.readdir but with relative paths
	const readdirRecursive = location => readdirPreserveRelativePath(location)
		.reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
			? result.concat(readdirRecursive(currentValue))
			: result.concat(currentValue), [])
	const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => {
		return file.indexOf('.png') > -1
	})
	// Extract feature list from screenshot list
	const featuresList = Array.from(new Set(screenshots.map(x => x.match(/[\w-_.]+\.feature/g)[0])))
	featuresList.forEach(feature => {
		screenshots.forEach(screenshot => {
			// regex to parse 'I can use scenario outlines with examples' from either of these:
			//   - Getting Started -- I can use scenario outlines with examples (example #1) (failed).png
			//   - Getting Started -- I can use scenario outlines with examples (failed).png
			//   - Getting Started -- I can use scenario outlines with examples.png 
			const regex = /(?<=--\ ).+?((?=\ \(example\ #\d+\))|(?=\ \(failed\))|(?=\.\w{3}))/g
			const [scenarioName] = screenshot.match(regex)
			console.info(chalk.blue('\n    Adding screenshot to cucumber-json report for'))
			console.info(chalk.blue(`    '${scenarioName}'`))
			// Find all scenarios matching the scenario name of the screenshot.
			// This is important when using the scenario outline mechanism
			const myScenarios = cucumberReportMap[feature][0].elements.filter(
				e => scenarioName.includes(e.name)
			)
			if (!myScenarios) { return }
			let foundFailedStep = false
			myScenarios.forEach(myScenario => {
				if (foundFailedStep) {
					return
				}
				let myStep
				if (screenshot.includes('(failed)')) {
					myStep = myScenario.steps.find(
						step => step.result.status === 'failed'
					)
				} else {
					myStep = myScenario.steps.find(
						step => step.name.includes('screenshot')
					)
				}
				if (!myStep) {
					return
				}
				const data = fs.readFileSync(
					path.resolve(screenshot)
				)
				if (data) {
					const base64Image = Buffer.from(data, 'binary').toString('base64')
					if (!myStep.embeddings) {
						myStep.embeddings = []
						myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' })
						foundFailedStep = true
					}
				}
			})
			//Write JSON with screenshot back to report file.
			fs.writeFileSync(
				path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
				JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
			)
		})
	})
}

function addSnapshots() {
	// Prepend the given path segment
	const prependPathSegment = pathSegment => location => path.join(pathSegment, location)
	// fs.readdir but with relative paths
	const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location))
	// Recursive fs.readdir but with relative paths
	const readdirRecursive = location => readdirPreserveRelativePath(location)
		.reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
			? result.concat(readdirRecursive(currentValue))
			: result.concat(currentValue), [])
	const snapshots = readdirRecursive(path.resolve(snapshotDir)).filter(file => {
		return file.indexOf('.diff.png') > -1
	})
	// Extract feature list from screenshot list
	const featuresList = Array.from(new Set(snapshots.map(x => x.match(/[\w-_.]+\.feature/g)[0])))
	featuresList.forEach(feature => {
		snapshots.forEach(snapshot => {
			// regex to parse 'I can use visual testing to check against a baseline' from
			// Getting Started -- I can use visual testing to check against a baseline.diff.png
			const regex = /(?<=--\s)[\w\s\,]+/g
			const [scenarioName] = snapshot.match(regex)
			console.info(chalk.blue('\n    Adding snapshot to cucumber-json report for'))
			console.info(chalk.blue(`    '${scenarioName}'`))
			const myScenarios = cucumberReportMap[feature][0].elements.filter(
				e => scenarioName.includes(e.name)
			)
			if (!myScenarios) { return }
			myScenarios.forEach(myScenario => {
				const myStep = myScenario.steps.find(
					step => step.result.status === 'failed'
				)
				if (!myStep) { return }
				const data = fs.readFileSync(
					path.resolve(snapshot)
				)
				if (data) {
					const base64Image = Buffer.from(data, 'binary').toString('base64')
					if (!myStep.embeddings) {
						myStep.embeddings = []
					} else {
						//remove screenshot before adding snapshot
						myStep.embeddings.pop()
					}
					myStep.embeddings.push({ mime_type: 'image/png', data: base64Image })
				}
			})
			//Write JSON with snapshot back to report file.
			fs.writeFileSync(
				path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
				JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
			)
		})
	})
}

function sendAlert(jsonTemplate) {
	var myHeaders = new fetch.Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify(jsonTemplate)
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};
	fetch("https://4iholding.webhook.office.com/webhookb2/fc8ac941-0fbd-456c-a00f-4151dacec3eb@7d9e02ea-7954-4806-be98-52607772498f/IncomingWebhook/af8a3d74306c453cbb6d829db97deeed/1f095196-a730-4b94-8b71-fdeaed767e46", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}

function generateReport() {
	if (!fs.existsSync(cucumberJsonDir)) {
		console.warn(chalk.yellow(`WARNING: Folder './${cucumberJsonDir}' not found. REPORT CANNOT BE CREATED!`))
	} else {
		report.generate({
			jsonDir: cucumberJsonDir,
			reportPath: htmlReportDir,
			displayDuration: true,
			pageTitle: process.env.PROJECT_NAME + ' Report',
			reportName: process.env.PROJECT_NAME + ` Report - ${new Date().toLocaleString()}`,
			metadata: {
				browser: {
					name: process.env.BROWSER,
					version: process.env.BROWSER_VERSION
				},
				device: process.env.DEVICE,
				platform: {
					name: 'linux',
					version: process.env.OS_VERSION
				}
			},
			customData: {
				title: 'Run Info',
				data: [
					{ label: 'Project', value: process.env.PROJECT_NAME },
					{ label: 'Release', value: process.env.RELEASE },
					{ label: 'URL', value: process.env.BASEURLREPORT }
				]
			}
		})
	}
}

function getReportStatus() {
	const files = fs.readdirSync(cucumberJsonDir).filter(file => {
		return file.indexOf('.json') > -1
	});

	var status = "Succeeded ✅";
	var duration = 0;

	files.forEach(file => {
		const json = JSON.parse(
			fs.readFileSync(path.join(cucumberJsonDir, file))
		);
		if (!json[0]) { return; }

		for (let i in json[0].elements) {
			for (let j in json[0].elements[i].steps) {
				var step = json[0].elements[i].steps[j];
				var stepStatus = step.result.status;
				var stepDuration = step.result.duration || 0;  // Garantir que stepDuration é válido

				if (stepStatus === "passed" || stepStatus === "failed") {
					duration += stepDuration;
				}

				if (stepStatus === "failed") {
					status = "Failed ❌";
				}
			}
		}
	});

	var durationInSeconds = (duration * 1e-9);

	// Garantir que durationInSeconds seja válido
	if (isNaN(durationInSeconds) || durationInSeconds < 0) {
		durationInSeconds = 0;
	}

	var durationTime = new Date(durationInSeconds * 1000).toISOString().slice(11, 19);
	return [status, durationTime];
}


function getJsonTemplate(module, status, duration, version) {
	var templateRaw = fs.readFileSync('cypress/reporting/template.json', 'utf8')
	var templateJSON = JSON.parse(templateRaw)

	templateJSON.sections[0].activityTitle = module
	templateJSON.sections[0].activitySubtitle = Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
	templateJSON.sections[0].facts[0].value = status
	templateJSON.sections[0].facts[1].value = version
	templateJSON.sections[0].facts[2].value = duration

	return templateJSON
}

function generateAlert() {
	let statusReport = getReportStatus()
	let status = statusReport[0]
	let duration = statusReport[1]

	let jsonTemplate = getJsonTemplate(process.env.FEATURE, status, duration, process.env.RELEASE)
	sendAlert(jsonTemplate)
}