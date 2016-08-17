# BroccoliCoRequestInvitation

## Dev stacks
- GIT
- NodeJS(4.x): NPM is used as dependency management tool. NodeJS is required for development such as running Webpack, Grunt etc.
- Angular 1.5
- Bootstrap3
- grunt: task runner.
- webpack: resource bundler.
- Jasmine：test scripts.
- Protractor: E2E test framework. 
- Sass: custom stylesheets. 

## How to install required software and set up project on OSX
- Install git from **https://git-scm.com/**
- Clone the repo:  `git clone https://github.com/melfly/BroccoliCoRequestInvitation.git` in terminal
- Install Node JS (npm) from **https://nodejs.org/**
- Install project dependecies via npm: run `npm install` in project_home folder
- Install protractor: run `sudo npm install -g protractor`
- Install webdriver: run `sudo webdriver-manager update`

## How to run application
1. Execute `grunt run` in **project_home** folder
2. Open <http://localhost:9999> in the browser.

## How to run e2e tests
1. Make sure the app is up and running.
2. In one terminal window, run `webdriver-manager start` to start a Selenium server.
3. In another terminal window, go to **project_home/e2e** folder
4. Execute `protractor protractor.config.js`

## Design considerations
- No unit test was written due to my time constraints. Also there is not much logic in javascript to test.
- A few e2e automation test were written using protractor/jasmine. It is under **e2e** folder.
- Running test should really be a grunt task. Again it's not done due to the time I had.
- Used flexbox layout instead bootstrap grid system wherever suitable.
- Used modal service from angular-ui-bootstrap to implement the pop-ups.
- Used HTML5 validation on some of form inputs - could use regex for validation if we need to support old browsers.