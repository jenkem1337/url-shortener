FROM node:20-alpine
    WORKDIR /home/node/url-shortener
    COPY . .
    
    ENV REDIS_PORT  "6379"
    ENV REDIS_ADDR  "redis"
    
    ENV POSTGRES_HOST "postgres"
    ENV POSTGRES_USERNAME  "postgres"
    ENV POSTGRES_PASSWORD  "admin"
    ENV POSTGRES_DB_NAME  "url_shortener_db"
    ENV POSTGRES_PORT = "5432"

    RUN npm install
    WORKDIR /home/node/url-shortener/src/Infrastructure/Server
    CMD ["node", "-r", "ts-node/register", "index.ts"]



