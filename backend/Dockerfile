# ── Build stage ────────────────────────────────────────
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ── Production deps ─────────────────────────────────────
FROM node:24-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

# ── Final image ─────────────────────────────────────────
FROM node:24-alpine AS runner

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

# Create uploads dir
RUN mkdir -p uploads && chown -R appuser:appgroup uploads

USER appuser

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
