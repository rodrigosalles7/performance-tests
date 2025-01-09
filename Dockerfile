FROM grafana/k6:latest
WORKDIR /app
COPY . .
ENTRYPOINT ["K6_WEB_DASHBOARD=true", "k6", "run", "/app/performance/loadTest.js"]