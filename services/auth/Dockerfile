# ---------- build stage ----------
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev        

# copy source
COPY src ./src
COPY .env .env              

EXPOSE 3000
CMD ["node", "src/server.js"]
