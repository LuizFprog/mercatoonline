# STAGE 1: builder - Compila o código TypeScript para JavaScript
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# STAGE 2: production - Cria a imagem final e otimizada
FROM node:18-alpine
WORKDIR /usr/src/app

# Instala o OpenSSL, que é uma dependência do Query Engine do Prisma no Alpine
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist
COPY prisma ./prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && node dist/main"]