FROM grafana/k6:latest
WORKDIR /app
COPY . .
ENTRYPOINT ["k6", "run", "/app/performance/loadTest.js"]