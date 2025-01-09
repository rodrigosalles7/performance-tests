# Cypress Automation Test Setup

Este repositório é um exemplo para configurar um ambiente com Cypress para testes automatizados, incluindo Node.js, Docker, e outras dependências necessárias.

## Pré-requisitos

- Ubuntu 20.04 ou mais recente.
- Acesso ao terminal com privilégios de administrador (sudo).
- Internet estável para baixar pacotes e dependências.

---

## Etapas de Instalação

### 1. Remover Node.js existente (se aplicável)
```bash
sudo apt-get remove nodejs
sudo apt-get autoremove
sudo apt-get purge nodejs
```

### 2. Instalar Node.js mais recente

#### Adicionar repositório do Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
```

#### Atualizar pacotes e instalar Node.js:
```bash
sudo apt-get update
sudo apt-get install -y nodejs
```

### 3. Instalar Docker e Docker Compose

#### Adicionar repositório Docker:
```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
sudo add-apt-repository "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

#### Atualizar pacotes e instalar Docker:
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo systemctl status docker
```

#### Verificar versões instaladas:
```bash
docker -v
docker compose version
```

#### Adicionar usuário ao grupo Docker:
```bash
sudo usermod -aG docker ${USER}
su - ${USER}
id -nG
```

### 4. Instalar Cypress

#### Instalar dependências do Cypress globalmente:
```bash
sudo npm install -g cypress
```

#### Verificar versão do Cypress instalada:
```bash
cypress -v
```

#### Alternativamente, instale o Cypress no projeto:
```bash
mkdir cypress-example
cd cypress-example
npm init -y
npm install cypress --save-dev
```

---

## Comandos Úteis para Instalar as Últimas Versões

Caso deseje garantir que está instalando as versões mais recentes das ferramentas essenciais, utilize os seguintes comandos:

### Node.js e npm
```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Docker e Docker Compose
```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
sudo add-apt-repository "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### Cypress
```bash
sudo npm install -g cypress
```

---

## Verificação de Configuração

1. **Node.js:** Verifique a versão com:
   ```bash
   node -v
   npm -v
   ```

2. **Docker:** Verifique o status com:
   ```bash
   sudo systemctl status docker
   docker -v
   docker compose version
   ```

3. **Cypress:** Inicie a interface do Cypress com:
   ```bash
   npx cypress open
   ```

---

## Estrutura do Projeto

- `cypress/` - Pasta principal contendo testes.
- `cypress.json` - Arquivo de configuração do Cypress.
- `package.json` - Gerenciamento de dependências do projeto.
- `docker-compose.yml` - Arquivo de configuração para rodar testes em containers.

---

## Rodando Testes

### Localmente

Os scripts disponíveis no `package.json` permitem a execução de diferentes tipos de testes com Cypress. Aqui estão os comandos principais:

- **Testes de regressão (UI) no navegador em modo headless:**
  ```bash
  npm run ecom:web:regression:headless
  ```
  **Descrição:** Executa testes de regressão para a interface web no navegador especificado.

- **Testes de sanidade (UI) no navegador em modo headless:**
  ```bash
  npm run ecom:web:sanity:headless
  ```
  **Descrição:** Executa testes básicos de verificação para a interface web.

- **Testes no navegador com interface gráfica:**
  ```bash
  npm run ecom:web:gui
  ```
  **Descrição:** Executa testes de interface web com a interface gráfica do navegador aberta.

- **Testes em resolução de dispositivo Android (360x640) no modo headless:**
  ```bash
  npm run ecom:android:headless
  ```
  **Descrição:** Simula o ambiente de um dispositivo Android para execução de testes.

- **Testes de API (sanidade) no modo headless:**
  ```bash
  npm run ecom:api:sanity:headless
  ```
  **Descrição:** Executa testes básicos para verificar endpoints de API.

- **Testes de API (regressão) no modo headless:**
  ```bash
  npm run ecom:api:regression:headless
  ```
  **Descrição:** Executa uma suíte completa de testes de regressão para APIs.

### Usando Docker

Os testes também podem ser executados em um ambiente Docker. Certifique-se de que o Docker e o Docker Compose estão instalados e configurados.

- **Iniciar o ambiente Docker:**
  ```bash
  docker-compose up
  ```

- **Executar comandos específicos dentro do container:**
  ```bash
  docker-compose run --rm cypress npx cypress run
  ```
  **Descrição:** Substitua `npx cypress run` pelo comando desejado, como `npm run ecom:web:regression:headless`.

- **Testes de OWASP com integração Cypress:**
  ```bash
  npm run owasp:report
  ```
  **Descrição:** Executa testes de segurança OWASP combinados com Cypress.

---

## Relatórios de Testes

- **Gerar relatório HTML:**
  ```bash
  npm run report:html
  ```
  **Descrição:** Gera relatórios de execução em formato HTML para análise.

- **Enviar resultados para QMetry/Jira:**
  ```bash
  npm run jira:qmetry
  ```
  **Descrição:** Envia os resultados consolidados para QMetry ou Jira.
