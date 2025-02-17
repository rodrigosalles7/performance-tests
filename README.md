# Testes de Performance

Este repositório contém scripts de testes de performance utilizando o **k6** para avaliar o comportamento e a resiliência da aplicação. Os testes podem ser executados **localmente** ou pelo **workflow do GitHub Actions**.

Os testes realizados são:

- **Load Test**
- **Soak Test**
- **Spike Test**
- **Stress Test**

Cada teste tem um objetivo específico e ajuda a identificar diferentes aspectos de desempenho da aplicação.

---

## Tipos de Testes

### 1. **Load Test**

**Objetivo:** Avaliar o desempenho da aplicação sob uma carga constante e previsível.

**Descrição:**  
O **Load Test** simula um número fixo de usuários acessando a aplicação por um determinado período de tempo. O objetivo é verificar a estabilidade da aplicação em condições normais de tráfego.

**Foco:**
- Identificar tempos de resposta.
- Verificar a taxa de erros e falhas.
- Avaliar a capacidade de lidar com a carga constante.

---

### 2. **Soak Test**

**Objetivo:** Verificar a resiliência da aplicação em cenários de uso prolongado.

**Descrição:**  
O **Soak Test** mantém uma carga constante de usuários por um período longo para identificar possíveis vazamentos de memória, degradação de desempenho e falhas que aparecem com o tempo.

**Foco:**
- Detectar falhas de estabilidade.
- Verificar o consumo de recursos ao longo do tempo.

---

### 3. **Spike Test**

**Objetivo:** Avaliar a capacidade da aplicação de lidar com picos de tráfego repentinos.

**Descrição:**  
O **Spike Test** aumenta rapidamente o número de usuários para simular picos de acesso e analisa como a aplicação reage a essa situação.

**Foco:**
- Testar a capacidade de escalar rapidamente.
- Avaliar a resiliência durante e após picos de tráfego.

---

### 4. **Stress Test**

**Objetivo:** Identificar o limite máximo da aplicação em termos de carga.

**Descrição:**  
O **Stress Test** aumenta progressivamente o número de usuários até que a aplicação atinja seu ponto de falha. Isso permite descobrir os limites e a capacidade máxima do sistema.

**Foco:**
- Determinar o ponto de falha da aplicação.
- Avaliar a recuperação após sobrecarga.

---

## Como Executar os Testes

Os testes podem ser executados **localmente** ou pelo **GitHub Actions**.

### Opção 1: Executar Localmente

#### **Pré-requisitos**
- **k6** instalado na máquina.

  ```bash
  curl -s https://packagecloud.io/install/repositories/grafana/stable/script.deb.sh | sudo bash
  sudo apt-get install k6
  k6 version
  ```

#### **Passos para Execução**

1. Clone este repositório:

    ```bash
    git clone https://github.com/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO/performance
    ```

2. Execute o teste desejado. Por exemplo, para rodar o **Load Test**:

    ```bash
    k6 run loadTest.js
    ```

---

### Opção 2: Executar via GitHub Actions

Os testes também podem ser executados diretamente pelo **workflow do GitHub Actions**.

#### **Configuração no GitHub Actions**
1. Acesse a aba **Actions** no repositório do GitHub.
2. Escolha o workflow correspondente ao tipo de teste desejado (**Load Test, Soak Test, Spike Test ou Stress Test**).
3. Configure os seguintes parâmetros antes de iniciar a execução:
   - **Quantidade de Virtual Users (VUs)**: Número de usuários simulados.
   - **Tempo de Execução**: Duração do teste.
   - **Método HTTP (GET ou POST)**: Tipo de requisição a ser realizada.
   - **Body da Requisição (caso POST)**: Necessário apenas se a requisição for do tipo POST.
4. Execute o workflow e acompanhe os relatórios gerados automaticamente.

---

## Relatórios

Após a execução dos testes, os resultados em **HTML** serão salvos no diretório `performance/reports/`. Para visualizar, basta abrir o arquivo `index.html` no navegador.

Se os testes forem executados via **GitHub Actions**, os relatórios estarão disponíveis nos artefatos do workflow.

---

Agora, você pode executar testes de performance tanto **localmente** quanto via **GitHub Actions**, garantindo flexibilidade e facilidade no monitoramento do desempenho da aplicação! 🚀

