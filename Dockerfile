FROM mcr.microsoft.com/playwright:v1.41.1-focal

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# COPY the needed files to the app folder
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY tests/ ./tests/
COPY testData/ ./testData/
COPY requests/ ./requests/
COPY utils/ ./utils/
COPY fixtures/ ./fixtures/
COPY playwright.config.ts/ ./playwright.config.ts
COPY variables.config.ts/ ./variables.config.ts

# Install the dependencies in Node environment
RUN npm install
