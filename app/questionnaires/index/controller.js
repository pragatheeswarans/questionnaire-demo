import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class QuestionnairesIndexController extends Controller {
  @action
  openQuestionnaire(questionnaire) {
    this.transitionToRoute('questionnaires.details', questionnaire);
  }
}
