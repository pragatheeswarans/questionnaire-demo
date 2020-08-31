import Controller from '@ember/controller';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isBlank, isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class QuestionnairesDetailsController extends Controller {
  @service('banner') bannerService;
  @tracked answers = null;
  @tracked isSaving = false;
  @tracked currentQuestion = null;
  @tracked animationClassName = 'slide-in-left';

  get canShowNext() {
    // Next question is possible if there are jumps (based on the answer)
    return isPresent(this.currentQuestion.jumps)
      ? true
      : isPresent(this.findNextQuestion());
  }

  get canShowPrevious() {
    return isPresent(this.findPreviousQuestion());
  }

  get selectedAnswerForCurrentQuestion() {
    return this.answers[this.currentQuestion.identifier];
  }

  findNextQuestion(currentAnswer) {
    /**
     * Find the next question based on the answer and the jumps array.
     * If no next question is found based on above scenario, return the next question in questions array.
     * If the next question is dependent on another question's answer, then we skip that question.
     */
    const { currentQuestion, model: { questions } } = this;
    if (isPresent(currentQuestion.jumps) && isPresent(currentAnswer)) {
      for (let jump of currentQuestion.jumps) {
        if (jump.conditions[0].value === currentAnswer) {
          return questions.findBy('identifier', jump.destination.id);
        }
      }
    }

    for (let i = questions.indexOf(currentQuestion) + 1; i < questions.length; i++) {
      if (isBlank(questions[i].dependsOn)) {
        return questions[i];
      }
    }
    return null;
  }

  findPreviousQuestion() {
    /**
     * If current question has a "dependsOn", then open that question. Since this question would have been
     * arrived by an answer to that dependent question.
     * Else, traverse back the array and check if the previous question (say x) has depends on and if so,
     * it's dependendent's answer is the dependsOnValue of this (x) question.
     */
    const { currentQuestion, model: { questions } } = this;
    if (isPresent(currentQuestion.dependsOn)) {
      return questions.findBy('identifier', currentQuestion.dependsOn);
    }

    for (let i = questions.indexOf(currentQuestion) - 1; i >= 0; i--) {
      if (isPresent(questions[i].dependsOn) && this.answers[questions[i].dependsOn] === questions[i].dependsOnValue) {
        return questions[i];
      } else if (isBlank(questions[i].dependsOn)) {
        return questions[i];
      }
    }
    return null;
  }

  @action
  updateAnswerForCurrentQuestion(answer) {
    if (isPresent(answer)) {
      this.answers[this.currentQuestion.identifier] = answer;
    }
  }

  @action
  showNextQuestion(currentAnswer) {
    const nextQuestion = this.findNextQuestion(currentAnswer);
    this.updateAnswerForCurrentQuestion(currentAnswer);
    if (isPresent(nextQuestion)) {
      this.currentQuestion = nextQuestion;
      this.animationClassName = 'slide-in-left';
    } else {
      // Since we show "Next" for a question with jumps, this scenario is possible if user didn't select any value.
      window.alert('You have reached the end of this questionnaire');
    }
  }

  @action
  showPreviousQuestion(currentAnswer) {
    this.updateAnswerForCurrentQuestion(currentAnswer);
    this.currentQuestion = this.findPreviousQuestion();
    this.animationClassName = 'slide-in-right';
  }

  @action
  saveResponse() {
    let isAnyAnswerAvailable = false;
    for (let key in this.answers) {
      if (isPresent(this.answers[key])) {
        isAnyAnswerAvailable = true;
        break;
      }
    }
    if (isAnyAnswerAvailable) {
      this.isSaving = true;
      // Payload will be an object of format { question-identifier: answer }
      return fetch(`/api/questionnaires/${this.model.id}/actions/submit/`, {
        method: 'POST',
        body: JSON.stringify(this.answers)
      }).then(() => {
        this.bannerService.show({
          type: 'success',
          message: 'Your response is successfully saved'
        });
        this.transitionToRoute('questionnaires');
      }).catch((exception) => {
        const { errors } = exception || {};
        const errorMessage = errors.detail || 'Something went wrong while saving your response';
        this.bannerService.show({
          type: 'failure',
          message: errorMessage
        });
      }).finally(() => {
        this.isSaving = false;
      });
    } else {
      window.alert('You have nothing to save');
    }
  }
}
