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
- Install git
- Install Node JS (npm)
- Install grunt
- Install webpack
- Install npm dependencies
- Install protractor/webdriver globally

## How to run application
1. Go to **project_home** folder
2. Execute `grunt run`

## How to run e2e tests
1. Make sure the app is up and running.
2. In one terminal window, run `webdriver-manager start`
3. In another terminal window, go to **project_home/e2e** folder
4. Execute `protractor protractor.config.js`

## Design considerations
- No unit test was written due to my time constraints. Also there is not much logic in javascript to test. 
- Used flexbox layout instead bootstrap grid system wherever suitable.
- Used modal service from angular-ui-bootstrap to implement the pop-ups.
- Used HTML5 validation on some of form input - could use regex for validation if we need to support old browsers.