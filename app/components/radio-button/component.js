import Component from '@glimmer/component';

export default class RadioButton extends Component {
  get checked() {
    return this.args.groupValue === this.args.value;
  }
}