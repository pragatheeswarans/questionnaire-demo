import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { later } from '@ember/runloop';
import { isArray } from '@ember/array';

export default class QuestionComponent extends Component {
  @tracked value = null;

  get isMultipleChoice() {
    return this.args.question.question_type === 'multiple-choice';
  }

  get canSelectedMultipleAnswers() {
    // Server response is not boolean (:wondering-why)
    return this.args.question.multiple !== 'false';
  }

  get isRadioField() {
    return this.isMultipleChoice && !this.canSelectedMultipleAnswers;
  }

  get isCheckboxField() {
    return this.isMultipleChoice && this.canSelectedMultipleAnswers;
  }

  get isTextField() {
    return this.args.question.question_type === 'text';
  }

  get isTextAreaField() {
    return this.isTextField && this.args.question.multiline == 'true';
  }

  get isNextDisabled() {
    return this.args.question.required && isEmpty(this.value);
  }

  removeAnimationClasses(element) {
    // The component is not destroyed. So we remove animation class after rendering.
    later(() => {
      element.classList.remove('slide-in-left', 'slide-in-right');
    }, 300);
  }

  @action
  updateValue(element) {
    // Didn't want to set the reference of the array passed
    this.value = isArray(this.args.answer) ? this.args.answer.slice() : this.args.answer;
    this.removeAnimationClasses(element);
  }

  @action
  onValueChange(newValue) {
    this.value = isArray(newValue) ? newValue.slice() : newValue;
  }
}