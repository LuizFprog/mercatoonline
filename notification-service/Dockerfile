# --- ESTÁGIO 1: BUILDER ---
# Usa uma imagem Node.js padrão para construir a aplicação
FROM node:18-slim as builder

WORKDIR /usr/src/app

# Copia os arquivos de pacotes e instala TODAS as dependências
COPY package*.json ./
RUN npm install

# Copia o resto do código
COPY . .

# Constrói a aplicação TypeScript (NÃO HÁ PASSO DO PRISMA AQUI)
RUN npm run build

# --- ESTÁGIO 2: RUNNER ---
# Começa com uma imagem limpa e só copia o necessário para rodar
FROM node:18-slim as runner

WORKDIR /usr/src/app

# Copia o package.json para saber as dependências de produção
COPY package.json ./

# Instala SOMENTE as dependências de produção
RUN npm install --omit=dev --ci

# Copia a aplicação já construída do estágio anterior
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
