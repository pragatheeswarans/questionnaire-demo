import Route from '@ember/routing/route';

export default class QuestionnairesIndexRoute extends Route {
  model() {
    return this.store.findAll('questionnaire');
  }
}
