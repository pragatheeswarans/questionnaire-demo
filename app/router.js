import EmberRouter from '@ember/routing/router';
import config from 'questionnaire-demo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('about');
  this.route('questionnaires', function() {
    this.route('details', { path: '/:id' });
  });
});
