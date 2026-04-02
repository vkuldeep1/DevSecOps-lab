FROM node:20-alpine3.20

RUN apk upgrade && apk update

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY app/package*.json ./

RUN npm install --only=production

COPY app/ .

USER appuser

EXPOSE 3000

CMD ["node", "index.js"]
