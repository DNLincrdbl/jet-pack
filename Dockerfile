FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./

ARG API_KEY
ENV RESEND_API_KEY=$API_KEY

RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./

ARG API_KEY
ENV RESEND_API_KEY=$API_KEY

RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm", "start"]