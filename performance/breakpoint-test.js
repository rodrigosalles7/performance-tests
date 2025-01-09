import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    executor: 'ramping-arrival-rate', // Assure load increase if the system slows
    stages: [
        { duration: '2h', target: 20000 },
    ],
};

export default () => {
    const urlRes = http.get('https://teste-api.k6.io');
    sleep(1);
};