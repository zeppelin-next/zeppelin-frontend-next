# Zeppelin Front-end

Zeppelin notebooks front-end built with Angular.

![screenshot](/screenshot.png?raw=true "Screenshot")

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

## Implementation Progress

### Pages

| Name | Route | Module     | UI |
| ---  | ----- | ---------- | -- |
| Home | `/`   | HomeModule |  Y |
| Login | `/login`       | LoginModule |  Y |
| Job Manager  | `/jobmanager`  | JobManagerModule |  Y |
| Interpreter Setting   | `/interpreter` | InterpreterModule |  Y |
| Notebook | `/notebook/{id}` | NotebookModule |  Y |
| Notebook Repos | `/notebookRepos` | X |  X |
| Credential     | `/credential` | X |  X |
| Helium | `/helium` | X |  X |
| Configuration | `/configuration` | X |  X |

### Notebook Features

| Feature | Note | State |
| ------  | ---- | ---- |
| Files System  | Create/ Rename/ Import etc.  | Y |
| Toolbar Actions  | The top toolbar actions   | Y |

### Paragraph Features

| Feature | Note | State |
| ------  | ---- | ---- |
| Grid layout and resizable | | Y |
| Code Editor | | Y |
| Actions  | The Corresponding actions of the drop-down menu in the setting button | Y |
| Actions(hot-keys)  | Support hot-keys for the actions  | X |

### Result Display

| Type | State |
| ------  | ---- |
| Dynamic Form  | Y |
| Text  | Y |
| Html  |  Y |
| Table  |  Y |
| Network  | X |

### Table Visualization

| Type | State |
| ------ | ---- |
| Line Chart  | Y |
| Bard Chart  |  Y |
| Pie Chart  |  Y |
| Area Chart  |  Y |
| Scatter Chart  | Y |

### Helium Visualization

| Type | Note | State |
| ------  | ---- | ---- |
| Prototype | To verify the implementable prototype | Y |
| Publish Dependencies | Just like [zeppelin-vis](https://github.com/apache/zeppelin/tree/master/zeppelin-web/src/app/visualization)  | X |
| Example Projects |   | X |
| Development Documents |   | X |
