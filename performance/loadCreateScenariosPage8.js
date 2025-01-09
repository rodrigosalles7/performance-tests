import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://api-hml2.ilotto.com.br/bff/customer/lucky-tickets-by-raffle/028574ba-34ea-42fb-9a4f-9c443dbf6abf?found=false&take=12&skip=0';
const VIRTUAL_USERS = __ENV.VIRTUAL_USERS || '10000';
const TEST_DURATION = __ENV.TEST_DURATION || '10m';

// Configuração de carga com base nas variáveis
export const options = {
	vus: parseInt(VIRTUAL_USERS),
	duration: TEST_DURATION,
};

export default function () {
	http.get(BASE_URL);
	sleep(1);
}