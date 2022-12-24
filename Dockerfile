# Etapa de construccion
FROM node:alpine as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Etapa despliegue
FROM nginx:alpine
#run apk add vim
copy default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/ /usr/share/nginx/html/
EXPOSE 8081
#CMD ["nginx", "-g", "daemon off;"]