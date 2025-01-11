import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const BASE_URL = __ENV.BASE_URL || 'https://api-hml2.ilotto.com.br';
const SPIKE_VUS_HIGH = __ENV.SPIKE_VUS_HIGH || 1400;
const SPIKE_VUS_LOW = __ENV.SPIKE_VUS_LOW || 100;
const SPIKE_DURATION_SHORT = __ENV.SPIKE_DURATION_SHORT || '10s';
const SPIKE_DURATION_LONG = __ENV.SPIKE_DURATION_LONG || '3m';
const SPIKE_RAMP_UP = __ENV.SPIKE_RAMP_UP || '1s';
const SPIKE_RAMP_DOWN = __ENV.SPIKE_RAMP_DOWN || '10s';

export const options = {
  stages: [
    { duration: SPIKE_RAMP_UP, target: SPIKE_VUS_HIGH },  // Ramp-up rápido
    { duration: SPIKE_DURATION_LONG, target: SPIKE_VUS_LOW },  // Mantém carga baixa
    { duration: SPIKE_DURATION_SHORT, target: SPIKE_VUS_HIGH },  // Spike para carga alta
    { duration: SPIKE_DURATION_LONG, target: SPIKE_VUS_HIGH },  // Mantém carga alta
    { duration: SPIKE_RAMP_DOWN, target: SPIKE_VUS_LOW },  // Ramp-down para carga baixa
    { duration: SPIKE_DURATION_LONG, target: SPIKE_VUS_LOW },  // Mantém carga baixa
    { duration: SPIKE_RAMP_DOWN, target: 0 },  // Finaliza o teste
  ],
};

export default function () {
  const url = (BASE_URL);
  http.get(url);
  sleep(1);
}

export function handleSummary(data) {
  return {
    "./reports/indexSpike.html": htmlReport(data),
  };
}
