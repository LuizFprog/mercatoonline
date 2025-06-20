# --- Estágio 1: Builder ---
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# CORREÇÃO AQUI: Instala TODAS as dependências para o build funcionar
RUN npm install

COPY . .

RUN npm run build

# --- Estágio 2: Runner --- (Esta parte já estava correta)
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Aqui sim, instalamos apenas as de produção para a imagem final
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

# EXCLUÍMOS A CÓPIA DA NODE_MODULES DO BUILDER, POIS JÁ INSTALAMOS A DE PRODUÇÃO
# COPY --from=builder /usr/src/app/node_modules ./node_modules <-- Remova ou comente esta linha se ela existir

EXPOSE 3000

CMD ["node", "dist/main"]