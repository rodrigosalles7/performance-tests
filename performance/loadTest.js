import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'https://hml2.ilotto.com.br';
const REQUEST_TYPE = __ENV.REQUEST_TYPE || 'GET'; // Variável de ambiente para GET ou POST
const POST_BODY = __ENV.POST_BODY || '{}'; // Corpo da requisição POST, em formato JSON
const VIRTUAL_USERS_CONSTANT = __ENV.VIRTUAL_USERS_CONSTANT || 10;
const VIRTUAL_USERS_RAMP_UP = __ENV.VIRTUAL_USERS_RAMP_UP || 10;
const VIRTUAL_USERS_RAMP_DOWN = __ENV.VIRTUAL_USERS_RAMP_DOWN || 0;
const TEST_DURATION_CONSTANT = __ENV.TEST_DURATION_CONSTANT || '5s';
const TEST_DURATION_RAMP_UP = __ENV.TEST_DURATION_RAMP_UP || '10s';
const TEST_DURATION_RAMP_DOWN = __ENV.TEST_DURATION_RAMP_DOWN || '5s';

// Configuração de carga
export const options = {
	stages: [
		{ duration: TEST_DURATION_RAMP_UP, target: VIRTUAL_USERS_RAMP_UP },
		{ duration: TEST_DURATION_CONSTANT, target: parseInt(VIRTUAL_USERS_CONSTANT) },
		{ duration: TEST_DURATION_RAMP_DOWN, target: VIRTUAL_USERS_RAMP_DOWN },
	],
	thresholds: {
		http_req_duration: ['p(95)<500'],
		http_req_failed: ['rate<0.01'],
	},
};

export default function () {
	let res;

	if (REQUEST_TYPE.toUpperCase() === 'POST') {
		res = http.post(BASE_URL, POST_BODY, { headers: { 'Content-Type': 'application/json' } });
	} else {
		res = http.get(BASE_URL);
	}

	// Validações para garantir qualidade da resposta
	check(res, {
		'status é 200': (r) => r.status === 200,
		'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
	});

	// Simula intervalo entre as requisições
	sleep(1);
}

export function handleSummary(data) {
	return {
		"./reports/indexLoad.html": htmlReport(data),
	};
}
