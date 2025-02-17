import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'https://api-hml2.ilotto.com.br';
const REQUEST_TYPE = __ENV.REQUEST_TYPE || 'POST'; // Variável de ambiente para GET ou POST
const STRESS_VUS_LOW = __ENV.STRESS_VUS_LOW || 100;
const STRESS_VUS_MEDIUM = __ENV.STRESS_VUS_MEDIUM || 200;
const STRESS_VUS_HIGH = __ENV.STRESS_VUS_HIGH || 300;
const STRESS_VUS_MAX = __ENV.STRESS_VUS_MAX || 400;
const STRESS_DURATION_SHORT = __ENV.STRESS_DURATION_SHORT || '2m';
const STRESS_DURATION_LONG = __ENV.STRESS_DURATION_LONG || '5m';
const STRESS_RAMP_DOWN = __ENV.STRESS_RAMP_DOWN || '10m';

export const options = {
  stages: [
    { duration: STRESS_DURATION_SHORT, target: STRESS_VUS_LOW },
    { duration: STRESS_DURATION_LONG, target: STRESS_VUS_LOW },
    { duration: STRESS_DURATION_SHORT, target: STRESS_VUS_MEDIUM },
    { duration: STRESS_DURATION_LONG, target: STRESS_VUS_MEDIUM },
    { duration: STRESS_DURATION_SHORT, target: STRESS_VUS_HIGH },
    { duration: STRESS_DURATION_LONG, target: STRESS_VUS_HIGH },
    { duration: STRESS_DURATION_SHORT, target: STRESS_VUS_MAX },
    { duration: STRESS_DURATION_LONG, target: STRESS_VUS_MAX },
    { duration: STRESS_RAMP_DOWN, target: 0 },
  ],
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
    "./reports/indexStress.html": htmlReport(data),
  };
}
