import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Questionnaires from 'questionnaire-demo/mirage/fixtures/questionnaires';

module('Unit | Controller | questionnaires | details', function(hooks) {
  setupTest(hooks);

  /**
  Questions Flow:

          text-01
            |
          list-01
            |
          list-02
  (yes)/          \(no or skip)
      /            \
  text-02         list-03
      \             /
       \           /
          text-03
  */

  test('Test finding next and previous questions', function(assert) {
    const controller = this.owner.lookup('controller:questionnaires/details');
    const questionnaire = Questionnaires.toArray().findBy('id', 39);
    questionnaire.questions[3].dependsOn = 'list-02';
    questionnaire.questions[3].dependsOnValue = 'yes';
    controller.answers = {};
    controller.model = questionnaire;
    controller.currentQuestion = questionnaire.questions[0];

    let nextQuestion = controller.findNextQuestion('Hello World');
    assert.equal(nextQuestion.identifier, 'list-01', 'Next question is returned correctly.');

    nextQuestion = controller.findNextQuestion();
    assert.equal(nextQuestion.identifier, 'list-01', 'Next question is returned correctly even when no answer is passed.');

    controller.currentQuestion = questionnaire.questions[2];
    nextQuestion = controller.findNextQuestion('yes');
    assert.equal(nextQuestion.identifier, 'text-02', 'When jumps is present, next question is returned correctly based on the answer.');

    nextQuestion = controller.findNextQuestion('no');
    assert.equal(nextQuestion.identifier, 'list-03', 'When jumps is present, next question is returned correctly even if the answer is not in the conditions.'); // Next question in the array is returned

    let previousQuestion = controller.findPreviousQuestion();
    assert.equal(previousQuestion.identifier, 'list-01', 'Previous question is returned correctly.');

    controller.currentQuestion = questionnaire.questions[4];
    previousQuestion = controller.findPreviousQuestion();
    assert.equal(previousQuestion.identifier, 'list-02', 'A question in the middle (with depends on value) is correctly skipped and the previous question is returned.');

    controller.answers['list-02'] = 'yes';
    previousQuestion = controller.findPreviousQuestion();
    assert.equal(previousQuestion.identifier, 'text-02', 'When the previous qn has depends on and the dependent question has the answer that brings the user to this question, the previous question is returned correctly.');

    controller.currentQuestion = questionnaire.questions[5];
    nextQuestion = controller.findNextQuestion('Hello World');
    assert.notOk(nextQuestion, 'Since this is the last question, next question is returned as null correctly.');
  });
});
