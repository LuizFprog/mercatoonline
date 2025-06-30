FROM node:18-slim as builder

# Instala o OpenSSL, uma dependência que o Prisma pode precisar.
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copia os arquivos de pacotes e instala TODAS as dependências.
COPY package*.json ./
RUN npm install

# Copia o resto do código.
COPY . .

# Garante que o Prisma Client seja gerado e constrói a aplicação.
RUN npx prisma generate
RUN npm run build

# Este estágio começa com uma imagem limpa e só copia o necessário.
FROM node:18-slim as runner

WORKDIR /usr/src/app

# Copia o package.json para saber as dependências de produção.
COPY package.json ./

# Instala SOMENTE as dependências de produção de forma otimizada.
RUN npm install --omit=dev --ci

# Copia os artefatos construídos do estágio 'builder'.
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000

# Comando final para iniciar a aplicação.
CMD ["node", "dist/main"]
