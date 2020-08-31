import RESTSerializer from '@ember-data/serializer/rest';
import { isPresent } from '@ember/utils';

export default class QuestionnairesSerializer extends RESTSerializer.extend() {
  normalizeResponse(store, primaryModelClass, payload /*, id, requestType*/) {
    const questionnaires = payload.questionnaires || [payload.questionnaire];
    questionnaires.forEach((questionnaire) => {
      const { questions } = questionnaire;
      questions.forEach((question) => {
        if (isPresent(question.jumps)) {
          question.jumps.forEach((jump) => {
            const dependentQuestion =  questions.findBy('identifier', jump.destination.id) || {};
            /**
             * Assuming a question is dependent on only one other question.
             * Should be an array of objects if multiple dependents are possible.
             * Also it is better if server returns this in the question object.
            */
            dependentQuestion.dependsOn = jump.conditions[0].field;
            dependentQuestion.dependsOnValue = jump.conditions[0].value;
          });
        }
      })
    });
    return super.normalizeResponse(...arguments);
  }
}
