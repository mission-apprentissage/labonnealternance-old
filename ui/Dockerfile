FROM node:16.17-alpine

#Install and cache node_modules
COPY package.json yarn.lock /tmp/
RUN cd /tmp && \
    yarn install --frozen-lockfile && \
    mkdir -p /app && \
    mv /tmp/node_modules /app/

WORKDIR /app
COPY ./ /app

RUN yarn build

EXPOSE 3000
CMD yarn start
