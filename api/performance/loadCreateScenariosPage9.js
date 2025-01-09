import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://api-hml.ilotto.com.br/bff/customer/winners-feed?orderBy=date&skip=10&take=10';
const VIRTUAL_USERS = __ENV.VIRTUAL_USERS || '10000';
const TEST_DURATION = __ENV.TEST_DURATION || '5m';

// Configuração de carga com base nas variáveis
export const options = {
	vus: parseInt(VIRTUAL_USERS),
	duration: TEST_DURATION,
};

export default function () {
	http.get(BASE_URL);
	sleep(1);
}