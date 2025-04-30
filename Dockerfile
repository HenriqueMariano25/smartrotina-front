FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

ARG API_BASE_URL

ENV API_BASE_URL=$API_BASE_URL

RUN npm install

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]