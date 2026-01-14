FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

FROM node:20-slim

WORKDIR /app

# Install codex CLI globally
RUN npm install -g @openai/codex

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist/

ENTRYPOINT ["node", "dist/index.js"]
