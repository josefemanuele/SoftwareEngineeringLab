FROM node:alpine AS frontend-build
WORKDIR /data

COPY src/package.json .
RUN npm install

COPY src .
RUN npx expo export:web

FROM nginx:alpine-slim
COPY --from=frontend-build /data/web-build /usr/share/nginx/html
