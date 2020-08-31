import Component from '@glimmer/component';

export default class RadioGroupComponent extends Component {
  get labelProperty() {
    return this.args.labelProperty || 'label';
  }

  get valueProperty() {
    return this.args.valueProperty || 'value';
  }

  get groupName() {
    return this.args.groupName || 'radio-group';
  }
}
