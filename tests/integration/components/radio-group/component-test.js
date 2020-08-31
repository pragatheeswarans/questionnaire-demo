import { click, find, findAll } from '@ember/test-helpers'
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | radio-group', function(hooks) {
  setupRenderingTest(hooks);

  test('Basic component functionalities', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.setProperties({
      strongestAvenger: null,
      choices: [{
        label: 'Iron Man',
        value: 'iron_man'
      }, {
        label: 'Hulk',
        value: 'hulk'
      }, {
        label: 'Thor',
        value: 'thor'
      }, {
        label: 'Captain America',
        value: 'captain_america'
      }],
      groupName: 'Strongest Avenger',
      labelProperty: 'label',
      valueProperty: 'value'
    });
    this.set('onValueChange', (value) => {
      this.set('strongestAvenger', value);
    });

    await render(hbs`
      <RadioGroup
        @options={{this.choices}}
        @groupValue={{this.strongestAvenger}}
        @groupName={{this.groupName}}
        @labelProperty={{this.labelProperty}}
        @valueProperty={{this.valueProperty}}
        @onChange={{this.onValueChange}}
      />
    `);

    assert.ok(find('[data-test-id="radiogroup"]'), 'Radio Group is rendered.');
    assert.equal(findAll('label[role="radio"]').length, this.choices.length, 'All choices are rendered.');
    assert.equal(find('[data-test-id="radio-button-captain_america"]').innerText.trim(), 'Captain America', 'Option label is rendered correctly');
    assert.notOk(find('input[type="radio"]:checked'), 'By default none of the options are selected.');
    await click('[data-test-id="radio-button-thor"]');
    assert.equal(find('input[type="radio"]:checked').value, 'thor', 'Clicking on radio option is selecting the option correctly.');
    await click('[data-test-id="radio-button-hulk"]');
    assert.equal(find('input[type="radio"]:checked').value, 'hulk', 'Clicking on radio option is selecting the option correctly.');
    assert.equal(findAll('input[type="radio"]:checked').length, 1, 'Only 1 option is selected when clicking on multiple radio buttons');
    assert.equal(this.strongestAvenger, 'hulk', 'Call back is called correctly on selecting the radio button');

    // Selecting default value, not passing labelProperty and valueProperty to the component - scenarios
    this.set('strongestAvenger', 'iron_man');
    await render(hbs`
      <RadioGroup
        @options={{this.choices}}
        @groupValue={{this.strongestAvenger}}
        @onChange={{this.onValueChange}}
      />
    `);
    assert.ok(find('[data-test-id="radiogroup"]'), 'Radio Group is rendered.');
    assert.equal(findAll('label[role="radio"]').length, this.choices.length, 'All choices are rendered.');
    assert.equal(find('[data-test-id="radio-button-captain_america"]').innerText.trim(), 'Captain America', 'Option label is rendered correctly even if label property is not passed.');
    assert.equal(find('input[type="radio"]:checked').value, 'iron_man', 'Group value passed is selected by default correctly.');
    await click('[data-test-id="radio-button-hulk"]');
    assert.equal(find('input[type="radio"]:checked').value, 'hulk', 'Clicking on radio option is selecting the option correctly.');
    assert.equal(findAll('input[type="radio"]:checked').length, 1, 'Only 1 option is selected when clicking on multiple radio buttons');
  });
});
