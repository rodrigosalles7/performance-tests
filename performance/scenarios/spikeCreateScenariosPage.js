import http from 'k6/http';
import { sleep } from 'k6';

// Spike
export const options = {
	stages: [
		{ duration: "1s", target: 1000 },
		// { duration: "1m", target: 100 },
		// { duration: "10s", target: 1400 },
		// { duration: "3m", target: 1400 },
		// { duration: "10s", target: 100 },
		// { duration: "3m", target: 100 },
		// { duration: "10s", target: 0 },
	],
};

export default () => {
	const urlRes = http.get('https://api-hml2.ilotto.com.br/bff/customer/winners-feed?orderBy=date&skip=0&take=10');
	sleep(1);
};