FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_STRAPI_URL=/api
ARG VITE_ENABLE_CMS=true
ARG VITE_STRAPI_API_TOKEN=
ARG VITE_API_TIMEOUT=10000

ENV VITE_STRAPI_URL=$VITE_STRAPI_URL
ENV VITE_ENABLE_CMS=$VITE_ENABLE_CMS
ENV VITE_STRAPI_API_TOKEN=$VITE_STRAPI_API_TOKEN
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
