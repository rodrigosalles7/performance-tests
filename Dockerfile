FROM grafana/k6:latest

# Configura o diretório de trabalho
WORKDIR /app

# Copia todos os arquivos para o container
COPY . .

# Instala o Node.js e o k6-reporter
RUN apk add --no-cache nodejs npm
RUN npm install -g xk6-reporter-html

# Define o entrypoint para rodar o teste e gerar o relatório
ENTRYPOINT ["sh", "-c", "k6 run --out json=/app/performance/results.json /app/performance/loadTest.js && k6-reporter --type html /app/performance/results.json /app/performance/report.html"]
