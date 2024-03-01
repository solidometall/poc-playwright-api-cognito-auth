# POC Playwright API

## This automation project describes API tests implementing Playwright with Typescript.
- the demo site used is [atsea-sample-shop-app](https://github.com/dockersamples/atsea-sample-shop-app/).
- docker, docker-compose and Node.js are needed.

# Configuration

## Execute tests from Docker

"docker-compose" file configures database and application server, and executes tests.

Build and run the containers:

`docker-compose up --build --force-recreate`

## From local environment
If you want to run tests from your local environment against the sample site,
first of all you will need to install project dependencies using maven:

`npm install`

Next, you will need to run the docker compose file to create a simplified development environment consisting only of the application server and database.

`docker-compose -f docker-compose-sample-site-only.yml up --build --force-recreate`

Then you can run tests executing the command:

`npm run test`
