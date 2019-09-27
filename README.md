# Zeppelin Front-end

Zeppelin notebooks front-end built with Angular.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org) version 10.9.0 or later or use [creationix/nvm](https://github.com/creationix/nvm).
- NPM package manager (which is installed with Node.js by default).
- [Angular CLI](https://angular.io/cli) version 8.3.0 or later.

### Install

Run the `npm install` command to install dependencies in the project directory.

### Start Zeppelin server

[Run Zeppelin server](https://zeppelin.apache.org/contribution/contributions.html#run-zeppelin-server-in-development-mode) on `http://localhost:8080`.

If you are using a custom port instead of default(http://localhost:8080) or other network address, you can create `.env` file in project directory and set `SERVER_PROXY`.

*.env*

```
SERVER_PROXY=http://localhost:8080
```

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Road Map

- Configuration module
- Notebook Hotkeys
- Helium
  * Publish dependencies
  * Example projects
  * Development document