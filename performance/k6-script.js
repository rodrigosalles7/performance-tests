import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

export const options = {
	stages: [
		{ duration: "24s", target: 454 },
		{ duration: "1m12s", target: 454 },
		{ duration: "24s", target: 0 },
	],
	ext: {
		loadimpact: {
			distribution: {
				"amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
			},
		},
	},
};

const dataset_bin_format = open('../files/dataset_anual.xlsx', 'b');

export default function () {
	let auth_url = 'development-ecom.us.auth0.com'
	let baseurl = 'devapitest.eastus.cloudapp.azure.com'

	const fd = new FormData();
	fd.append('file', http.file(dataset_bin_format, 'dataset_anual.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'));
	fd.append('project_name', 'teste')
	fd.append('icon_url', 'https://saoseba.blob.core.windows.net/jureia/cc826f11-eed9-4ac7-ad01-08958faf0aae.png')

	const auth_body = {
		grant_type: 'password',
		username: 'teste@teste.com.br',
		password: 'Teste@123',
		audience: 'ecom',
		scope: 'openid profile email read:current_user create:users update:current_user_metadata create:users_app_metadata update:users_app_metadata',
		client_id: 'PlxI94OGlTT5fOibIaAEtqM91ht9TetT'
	};

	const params = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	group('Validate annual dataset for load tests', (_) => {

		// Login Auth0 request
		const login_response = http.post('https://' + auth_url + '/oauth/token', auth_body);
		check(login_response, {
			'is status 200': (r) => r.status === 200,
			'is access_token present': (r) => r.json().hasOwnProperty('access_token'),
		});
		params.headers['Authorization'] = `Bearer ${login_response.json()['access_token']}`;

		// Upload File API
		params.headers['Content-Type'] = 'multipart/form-data; boundary=' + fd.boundary;
		const upload_dataset = http.post(
			'https://' + baseurl + '/api/v1/upload',
			fd.body(), params);

		// Select Variable API
		const select_variable_body = JSON.stringify({
			var_y: 'pim',
			date_var: 'data_tidy',
			var_x: ["pib_tot", "pib_fam", "pib_ind", "pib_tot_lag1", "pib_ind_lag1", "pib_fam_lag1", "pib_fbcf_lag1", "pib_x", "pib_x_lag1", "ipca", "z_juros", "pib_fbcf", "cambio_r", "igp", "cambio_r_lag1", "z_juros_lag1", "ipca_lag1", "igp_lag1"]
		});
		params.headers['Content-Type'] = 'application/json';
		const select_variable_api = http.post(
			'https://' + baseurl + '/api/v1/variables/' + upload_dataset.json()['dataset_id'],
			select_variable_body, params);

		// Validate API
		const validate_api = http.get(
			'https://' + baseurl + '/api/v1/validate/' + upload_dataset.json()['dataset_id'], params);
	});
}