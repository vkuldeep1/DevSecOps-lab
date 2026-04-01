FROM node:20-alpine3.19

RUN apk update && apk upgrade

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY app/package*.json ./

RUN npm install --only=production

COPY app/ .

USER appuser

EXPOSE 3000

CMD ["node", "index.js"]
