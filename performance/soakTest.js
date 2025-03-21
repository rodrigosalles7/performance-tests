import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'https://hml2.ilotto.com.br';
const REQUEST_TYPE = __ENV.REQUEST_TYPE || 'POST'; // Variável de ambiente para GET ou POST
const STAGE1_DURATION = __ENV.STAGE1_DURATION || '2m';
const STAGE1_TARGET = __ENV.STAGE1_TARGET || 400;
const STAGE2_DURATION = __ENV.STAGE2_DURATION || '3h30m';
const STAGE2_TARGET = __ENV.STAGE2_TARGET || 400;
const STAGE3_DURATION = __ENV.STAGE3_DURATION || '2m';
const STAGE3_TARGET = __ENV.STAGE3_TARGET || 0;
const jsonData = JSON.parse(open('./post_body.json'));

// Configuração do soak test
export const options = {
	stages: [
		{ duration: STAGE1_DURATION, target: parseInt(STAGE1_TARGET) },
		{ duration: STAGE2_DURATION, target: parseInt(STAGE2_TARGET) },
		{ duration: STAGE3_DURATION, target: parseInt(STAGE3_TARGET) },
	],
	thresholds: {
		http_req_duration: ['p(95)<500'],
		http_req_failed: ['rate<0.01'],
	},
};

export default function () {
	let res;

	if (REQUEST_TYPE.toUpperCase() === 'POST') {
		res = http.post(BASE_URL, JSON.stringify(jsonData), { headers: { 'Content-Type': 'application/json' } });
		check(res, {
			'status é 201': (r) => r.status === 201,
			'tempo de resposta < 1000ms': (r) => r.timings.duration < 1000,
		});
	} else {
		res = http.get(BASE_URL);
		check(res, {
			'status é 200': (r) => r.status === 200,
			'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
		});
	}

	sleep(1);
}

export function handleSummary(data) {
	return {
		"./reports/indexSoak.html": htmlReport(data),
	};
}
