FROM grafana/k6:latest
WORKDIR /app
COPY . .
ENTRYPOINT ["k6", "run", "/app/api/performance/loadCreateScenariosPage.js"]