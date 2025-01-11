FROM grafana/k6:latest
WORKDIR /app
COPY . .
RUN k6 version
# ENTRYPOINT ["sh", "-c", "k6 run /app/performance/loadTest.js"]