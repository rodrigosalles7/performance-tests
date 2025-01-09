const { defineConfig } = require("cypress");
const cucumber = require('cypress10-cucumber-preprocessor').default

var shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const xlsx = require('node-xlsx').default;
const readXlsx = require('./cypress/plugins/read-xlsx')
const isFirefox = (browser) => browser.family === 'firefox'
const fetch = require('node-fetch')
const { Console } = require('console');

module.exports = defineConfig({
	viewportWidth: 360,
	viewportHeight: 800,
	defaultCommandTimeout: 60000,
	videoCompression: false,
	pageLoadTimeout: 180000,
	video: false,
	responsetimeout: 180000,

	e2e: {
		retries: 1,
		experimentalSessionAndOrigin: true,
		setupNodeEvents(on, config) {
			config.env.download_path = process.env.DOWNLOAD_PATH
			config.env.browser = process.env.BROWSER
			config.env.device = process.env.DEVICE
			config.env.feature = process.env.FEATURE

			config.env.admin_user = process.env.ECOM_MANAG_AUTH_ADMIN_USERNAME
			config.env.admin_pwd = process.env.ECOM_MANAG_AUTH_ADMIN_PWD

			//Projects BaseUrls
			if (process.env.FEATURE == 'EcomJourney') {
				config.baseUrl = process.env.ECOM_UI_BASEURL
				config.env.apiBaseUrl = process.env.ECOM_API_BASEURL
				config.env.admin_user = process.env.ECOM_MANAG_AUTH_ADMIN_USERNAME
				config.env.admin_pwd = process.env.ECOM_MANAG_AUTH_ADMIN_PWD
			}

			on('task', {
				createDownloadFolder(dir) {
					console.log('create folder %s', dir)
					if (!fs.existsSync(dir))
						fs.mkdirSync(dir)

					return null
				},
				findFile(downloadPath) {
					var findFile = true
					var count = 0
					while ((findFile) || (count < 1000)) {
						if (fs.existsSync(downloadPath) && fs.readdirSync(downloadPath).length) {
							var files = fs.readdirSync(downloadPath);
							if (!(files[0].includes("part") || files[0].includes("download"))) {
								var downloadedFilename = path.join(downloadPath, files[0]);
								console.log('filename', downloadedFilename)
								findFile = false
								count += 1000
							}
						}
						count++
					}
					return downloadedFilename
				},
				existFile(path) {
					if (fs.existsSync(path)) {
						return true
					}
					else return false
				},
				clearFile(path) {
					console.log('clearing folder %s', path)

					fs.rmdirSync(path, { recursive: true })

					return null
				},
			})

			//Used only to login tests via UI
			if (process.env.CHROMEWEBSECURITY == 'false') {
				config.chromeWebSecurity = false
			}

			on('before:browser:launch', (browser, options) => {
				console.log('browser %o', browser)
				var shelloutput = shell.exec("cat /etc/os-release")
				var [_, OSVersion] = shelloutput.match(/PRETTY_NAME="((?:\\.|[^"\\])*)"/)
				process.env['OS_VERSION'] = OSVersion
				process.env['BROWSER_VERSION'] = browser.version
				process.env['BASEURLREPORT'] = config.baseUrl
				if (process.env.LOCAL_TEST != 'local')
					shell.exec("env > .env")

				if (isFirefox(browser)) {
					const downloadDirectory = path.join(__dirname, 'cypress/fixtures/downloads/' + process.env.DEVICE + '/' + browser.name)
					options.preferences['browser.download.dir'] = downloadDirectory
					options.preferences['browser.download.folderList'] = 2
					options.preferences['browser.helperApps.neverAsk.saveToDisk'] = 'text/csv,text/xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					return options
				}
			})
			on('file:preprocessor', cucumber())

			return config
		},
		specPattern: "**/*.feature",
		// experimentalSessionAndOrigin: true,
		experimentalWebKitSupport: true,
	},
});
