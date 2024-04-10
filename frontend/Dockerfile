FROM node:alpine AS frontend-build
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npx expo export:web

FROM nginx:alpine-slim
COPY --from=frontend-build /app/web-build /usr/share/nginx/html
