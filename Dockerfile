# Etapa 1: Build com todas as dependências
FROM node:16.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Gera os bundles do cliente e do servidor
RUN npm run build:ssr

# Etapa 2: Produção (imagem leve)
FROM node:16.20-slim

WORKDIR /app

# Apenas os arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000

CMD ["node", "dist/server"]
