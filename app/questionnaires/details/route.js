import Route from '@ember/routing/route';

export default class QuestionnairesDetailsRoute extends Route {
  model(params) {
    return this.store.findRecord('questionnaire', params.id);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.currentQuestion = model.questions.firstObject;
    controller.answers = {};
  }
}
