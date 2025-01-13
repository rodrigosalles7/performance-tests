import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Função para gerar um CPF válido
function generateCPF() {
    let n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    n.push((n.reduce((s, v, i) => s + v * (10 - i), 0) * 10 % 11) % 10);
    n.push((n.reduce((s, v, i) => s + v * (11 - i), 0) * 10 % 11) % 10);
    return n.join('');
}

// Configuração do teste de carga do k6
export const options = {
    vus: 1, // Número de usuários virtuais
    duration: '1h', // Duração do teste
    thresholds: {
        http_req_duration: ['p(95)<2000'], // 95% das requisições devem estar abaixo de 2000ms
    },
};

// Array de CPFs para reutilizar
const cpfs = new SharedArray('cpfs', function () {
    return Array.from({ length: 10000 }, generateCPF);
});

// URL da API
const apiBaseUrl = 'https://api-hml2.ilotto.com.br';

// Função para criar um cliente
function createCustomer(cpf) {
    const url = `${apiBaseUrl}/customers/guest/${cpf}?name=teste&birthDate=01/01/1999`;
    const response = http.get(url);
    check(response, { 'status was 200': (r) => r.status === 200 });
    return response.json().customerId;
}

// Função para comprar um ticket
function buyTicket(cpf, customerId) {
    const url = `${apiBaseUrl}/carts/purchase`;
    const payload = JSON.stringify({
        cpf: cpf,
        customerId: customerId,
        email: `${Math.random().toString(36).substring(2, 10)}@teste.com`,
        phone: '5535999999999',
        raffleId: 'b5af8b36-015e-4d1b-a69d-ac2e22f5f663',
        ticketsAmount: 10000
        // ticketsAmount: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);
    check(response, { 'status was 201': (r) => r.status === 201 });
}

export default function () {
    // Seleciona um CPF da lista compartilhada
    const cpf = cpfs[Math.floor(Math.random() * cpfs.length)];

    // Cria um cliente e compra o ticket
    const customerId = createCustomer(cpf);
    if (customerId) {
        buyTicket(cpf, customerId);
    }

    // Pausa de 1 segundo para controlar a carga
    sleep(1);
}