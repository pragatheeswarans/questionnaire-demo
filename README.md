[![Build Status](https://travis-ci.com/pragatheeswarans/questionnaire-demo.svg?token=RMGi8FKA3gRCCgJxHN19&branch=master)](https://travis-ci.com/pragatheeswarans/questionnaire-demo)

## Coding Challenge Questionnaire

A small questionnaire Web Application similar to what [Typeform.com](https://www.typeform.com/#home-examples) offers.

You can preview the [demo here](https://pragatheeswarans.github.io/questionnaire-demo/)

## Requirements
- As a user I can answer questions very swiftly so that I don’t feel like I am wasting my time
- Your questionnaire is based on a JSON that the frontend uses to drive the questions
- As a user I can go back to a previous question without losing the answers I have given in a current
question
- Mobile First, use some SVG, use JS ES 6-7 features, good conventions for CSS

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm/yarn)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd questionnaire-demo`
* `yarn install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The demo is deployed using Github Pages from a separate branch.
Because of this, only index route will be loaded. Refreshing the app with a different route will result in 404. Although this will work well is localhost or if hosted in a domain.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
