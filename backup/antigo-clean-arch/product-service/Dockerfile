# Usando a imagem base robusta e compatível
FROM node:18-slim

# Instala a dependência do sistema operacional (OpenSSL) que o Prisma precisa
RUN apt-get update && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de manifesto de pacotes
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia todo o código-fonte
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Constrói a aplicação NestJS
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD [ "node", "dist/main" ]