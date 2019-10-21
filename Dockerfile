FROM node:10
COPY ./ /app
WORKDIR /app
ARG API_URL
ENV VUE_APP_API_URL=${API_URL}
RUN npm install && npm run build

FROM nginx
RUN mkdir /app
ARG API_URL
ENV VUE_APP_API_URL=${API_URL}
COPY --from=0 /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf