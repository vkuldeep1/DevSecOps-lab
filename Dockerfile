FROM node:20-alpine3.20

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only package files first (better caching)
COPY app/package*.json ./

# Install dependencies securely
RUN npm ci --omit=dev

# Copy app source
COPY app/ .

USER appuser

EXPOSE 3000

CMD ["node", "index.js"]
