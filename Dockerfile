FROM node:21 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:21-slim
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
EXPOSE 3030