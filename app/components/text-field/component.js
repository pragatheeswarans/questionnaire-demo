import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TextFieldComponent extends Component {
  @tracked value = null;

  @action
  onInsert(element) {
    this.value = this.args.value;
    element.focus();
  }

  @action
  onKeyUp(event) {
    this.args.onChange(this.value);
    if (event.key === 'Enter') {
      this.args.onEnter(this.value);
    }
  }
}
