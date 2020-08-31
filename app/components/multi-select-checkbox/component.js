import Component from '@glimmer/component';
import { get } from '@ember/object';
import { action } from '@ember/object';

export default class MultiSelectCheckboxComponent extends Component {
  values = [].concat(this.args.value).compact();

  get checkboxes() {
    return this.args.options.map((option) => {
      return {
        label: get(option, this.args.labelProperty),
        value: get(option, this.args.valueProperty),
        checked: this.values.includes(option.value)
      };
    });
  }

  @action
  updateSelection(value, event) {
    if (event.target.checked) {
      this.values.pushObject(value);
    } else {
      this.values.removeObject(value);
    }
    this.args.onChange(this.values);
  }
}
