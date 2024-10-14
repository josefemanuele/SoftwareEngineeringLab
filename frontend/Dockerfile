FROM node:alpine AS frontend-build
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npx expo export -p web

FROM nginx:alpine-slim
COPY --from=frontend-build /app/dist /usr/share/nginx/html
