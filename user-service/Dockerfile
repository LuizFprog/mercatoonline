FROM node:18-alpine as builder
WORKDIR /usr/src/app
RUN apk add --no-cache --virtual .builds-deps build-base python3 curl openssl-dev
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /usr/src/app
RUN apk add --no-cache openssl curl
COPY package.json ./
RUN npm install --omit=dev --ci
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /usr/src/app/prisma/data ./prisma/data
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
