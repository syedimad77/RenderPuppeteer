FROM ghcr.io/puppeteer/puppeteer:22.11.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
    ADMIN_USERNAME=superadmin12 \
    ADMIN_PASSWORD="Whatsweb#" \

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "app.js"]
