FROM grafana/k6:latest
WORKDIR /app
COPY . .
ENTRYPOINT ["sh", "-c", "k6 run /app/performance/loadTest.js"]