import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import fs from 'fs';

const BASE_URL = __ENV.BASE_URL || 'https://api-hml.ilotto.com.br/carts/purchase';
const REQUEST_TYPE = __ENV.REQUEST_TYPE || 'POST'; // Variável de ambiente para GET ou POST
const POST_BODY = __ENV.POST_BODY || '{"raffleId":"ea65656e-7a6c-404c-afbc-7a5f233eff5c","ticketsAmount":1,"customerId":"020a1e1b-526b-416d-894c-ba6e7f2f5068","email":"rodrigo.oliveira@scoder.com.br","cpf":"12622755635","phone":"5535992027336","isFromBalance":false,"purchaseWithPromotion":false}'; // Corpo da requisição POST, em formato JSON
// const POST_BODY = JSON.parse(__ENV.POST_BODY || '{"raffleId":"028574ba-34ea-42fb-9a4f-9c443dbf6abf","ticketsAmount":1,"customerId":"","name":"Rodrigo O. S.","email":"rodrigo.oliveira@scoder.com.br","cpf":"12622755635","phone":"5535992027336","birthDate":null,"purchaseWithPromotion":false}');
const VIRTUAL_USERS_CONSTANT = __ENV.VIRTUAL_USERS_CONSTANT || 1;
const VIRTUAL_USERS_RAMP_UP = __ENV.VIRTUAL_USERS_RAMP_UP || 1;
const VIRTUAL_USERS_RAMP_DOWN = __ENV.VIRTUAL_USERS_RAMP_DOWN || 0;
const TEST_DURATION_CONSTANT = __ENV.TEST_DURATION_CONSTANT || '2s';
const TEST_DURATION_RAMP_UP = __ENV.TEST_DURATION_RAMP_UP || '2s';
const TEST_DURATION_RAMP_DOWN = __ENV.TEST_DURATION_RAMP_DOWN || '2s';

// Configuração de carga
export const options = {
	stages: [
		{ duration: TEST_DURATION_RAMP_UP, target: VIRTUAL_USERS_RAMP_UP },
		{ duration: TEST_DURATION_CONSTANT, target: parseInt(VIRTUAL_USERS_CONSTANT) },
		{ duration: TEST_DURATION_RAMP_DOWN, target: VIRTUAL_USERS_RAMP_DOWN },
	],
	// thresholds: {
	// 	http_req_duration: ['p(95)<2000'],
	// 	http_req_failed: ['rate<0.01'],
	// },
};

export default function () {
	let res;

	if (REQUEST_TYPE.toUpperCase() === 'POST') {
		const body = JSON.parse(fs.readFileSync('post_body.json', 'utf8'));
		res = http.post(BASE_URL, JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } });
		console.log(res)
		check(res, {
			'status é 201': (r) => r.status === 201,
			'tempo de resposta < 1000ms': (r) => r.timings.duration < 1000,
		});
	} else {
		res = http.get(BASE_URL);
		console.log(res)
		check(res, {
			'status é 200': (r) => r.status === 200,
			'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
		});
	}

	sleep(1);
}

export function handleSummary(data) {
	return {
		"./reports/indexLoad.html": htmlReport(data),
	};
}
