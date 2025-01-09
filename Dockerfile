FROM grafana/k6:latest

# Troca para o usuário root para permitir instalação de pacotes
USER root

# Configura o diretório de trabalho
WORKDIR /app

# Copia todos os arquivos para o container
COPY . .

# Instala o Node.js e o k6-reporter
RUN apk add --no-cache nodejs npm
RUN npm install -g xk6-reporter-html

# Retorna ao usuário padrão do container
USER 1000

# Define o entrypoint para rodar o teste e gerar o relatório
ENTRYPOINT ["sh", "-c", "k6 run --out json=/app/performance/results.json /app/performance/loadTest.js && k6-reporter --type html /app/performance/results.json /app/performance/report.html"]
