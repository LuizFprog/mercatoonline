# --- ESTÁGIO 1: BUILDER ---
FROM node:18-alpine as builder
RUN apk add --no-cache --virtual .builds-deps build-base python3 curl openssl-dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# --- ESTÁGIO 2: RUNNER ---
FROM node:18-alpine as runner
RUN apk add --no-cache openssl curl
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --omit=dev --ci
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/@prisma /usr/src/app/node_modules/@prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client /usr/src/app/node_modules/@prisma/client
COPY --from=builder /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3000
CMD ["node", "dist/main"]
