import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://hml2.ilotto.com.br';
const VIRTUAL_USERS_CONSTANT = __ENV.VIRTUAL_USERS_CONSTANT || 10;
const VIRTUAL_USERS_RAMP_UP = __ENV.VIRTUAL_USERS_RAMP_UP || 10;
const VIRTUAL_USERS_RAMP_DOWN = __ENV.VIRTUAL_USERS_RAMP_DOWN || 0;
const TEST_DURATION_CONSTANT = __ENV.TEST_DURATION_CONSTANT || '10s';
const TEST_DURATION_RAMP_UP = __ENV.TEST_DURATION_RAMP_UP || '20s';
const TEST_DURATION_RAMP_DOWN = __ENV.TEST_DURATION_RAMP_DOWN || '10s';

// Configuração de carga
export const options = {
	stages: [
		{ duration: TEST_DURATION_RAMP_UP, target: VIRTUAL_USERS_RAMP_UP },  // Ramp-up para 50 usuários em 1 minuto
		{ duration: TEST_DURATION_CONSTANT, target: parseInt(VIRTUAL_USERS_CONSTANT) },  // Mantém os usuários virtuais especificados
		{ duration: TEST_DURATION_RAMP_DOWN, target: VIRTUAL_USERS_RAMP_DOWN },  // Ramp-down para 0 usuários em 1 minuto
	],
	thresholds: {
		http_req_duration: ['p(95)<500'], // 95% das requisições devem ser menores que 500ms
		http_req_failed: ['rate<0.01'],   // Taxa de falhas < 1%
	},
};

export default function () {
	const res = http.get(BASE_URL);

	// Validações para garantir qualidade da resposta
	check(res, {
		'status é 200': (r) => r.status === 200,
		'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
	});

	// Simula intervalo entre as requisições
	sleep(1);
}
