# Stage 1: Build Angular static assets
FROM node:10.7.0-alpine as node
LABEL author="JPYeverino"
WORKDIR /app
COPY . .
RUN npm install
COPY ./ /app/
RUN npm run build -- --output-path=./dist/out --prod

# Stage 2: Serve Angular assets using NGINX
FROM nginx:1.15.2-alpine
LABEL author="JPYeverino"

# Copy custom nginx config
COPY ./config/chatapp.conf /etc/nginx/conf.d/chatapp.conf
COPY --from=node /app/dist/out /usr/share/nginx/html
EXPOSE 80 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]