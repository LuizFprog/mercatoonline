# --- ESTÁGIO 1: BUILDER ---
FROM node:20-alpine as builder
RUN apk add --no-cache --virtual .builds-deps build-base python3 curl openssl-dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# --- CORREÇÃO AQUI ---
# Executa o script 'prisma:generate' definido no package.json.
# Esta é a forma mais robusta de evitar erros de 'command not found'.
RUN npm run prisma:generate
RUN npm run build

# --- ESTÁGIO 2: RUNNER ---
FROM node:20-alpine as runner
RUN apk add --no-cache openssl curl
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --omit=dev --ci

# Copia os ficheiros da aplicação já compilados
COPY --from=builder /usr/src/app/dist ./dist

# Copia o schema do Prisma e os ficheiros de migração/seed
COPY --from=builder /usr/src/app/prisma ./prisma

# Copia o motor do Prisma e o Prisma Client JÁ GERADO do estágio de build
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 3000
CMD ["node", "dist/main"]