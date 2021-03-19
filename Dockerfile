FROM keymetrics/pm2:latest-alpine as deploy
RUN apk --no-cache add --virtual builds-deps build-base python git
WORKDIR /opt/app
COPY pm2.json .
COPY package.json .
RUN npm install --only=prod
COPY dist /opt/app/dist/
CMD ["pm2-runtime", "start", "pm2.json"]