# Build stage
FROM node:18-alpine AS builder
RUN corepack enable && corepack prepare yarn@4.6.0 --activate

WORKDIR /app
COPY . .

# Build the app
RUN yarn install
RUN cd apps/client && yarn build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# Add nginx configuration for SPA routing
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 