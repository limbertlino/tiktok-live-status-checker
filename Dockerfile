FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

RUN apt update && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

RUN npx tsc

RUN npm install -g .

USER node