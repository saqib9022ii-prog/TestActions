# Stage 1: Build React frontend
FROM node:22 AS build
WORKDIR /app/client
COPY client/package*.json ./
COPY client/ ./
RUN npm install
RUN npm run build

# Stage 2: Setup Node.js backend
FROM node:22
WORKDIR /app
COPY server/package*.json ./server/
COPY server/ ./server/
RUN cd server && npm install

# Copy React frontend dist folder
COPY --from=build /app/client/dist ./client/dist

EXPOSE 5000
ENV PORT=5000

# Start backend
CMD ["node", "server/index.js"]
