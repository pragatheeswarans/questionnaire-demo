import { click, fillIn, find, triggerKeyEvent } from '@ember/test-helpers'
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Questionnaires from 'questionnaire-demo/mirage/fixtures/questionnaires';

module('Integration | Component | question', function(hooks) {
  setupRenderingTest(hooks);

  test('Basic functionalities', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.setProperties({
      answer: null,
      hasNext: true,
      hasPrevious: true,
      isOnNextCalled: false,
      isOnPreviousCalled: false,
      onNext: (answer) => {
        this.set('answer', answer);
        this.set('isOnNextCalled', true);
      },
      onPrevious: (answer) => {
        this.set('answer', answer);
        this.set('isOnPreviousCalled', true);
      },
      currentQuestion: Questionnaires.toArray().findBy('id', 39).questions[0]
    });

    await render(hbs`
      <Question
        @question={{this.currentQuestion}}
        @answer={{this.answer}}
        @hasNext={{this.hasNext}}
        @hasPrevious={{this.hasPrevious}}
        @onNext={{this.onNext}}
        @onPrevious={{this.onPrevious}}
      />
    `);

    assert.equal(find('[data-test-id="question-header"]').innerText.trim(), this.currentQuestion.headline, 'Question header is rendered correctly.');
    assert.ok(find('[data-test-id="next"]'), 'Next button is rendered.');
    assert.ok(find('[data-test-id="previous"]'), 'Previous button is rendered.');
    assert.notOk(find('[data-test-id="save"]'), 'Save button is not rendered as expected.');
    assert.ok(find('[data-test-id="text-field"]'), 'Text field is rendered as expected.');
    await fillIn('[data-test-id="text-field"]', 'Hello World');
    assert.notOk(this.isOnNextCalled, 'Initially onNextCalled is false.');
    await triggerKeyEvent('[data-test-id="text-field"]', 'keyup', 13); // Pressing Enter
    assert.ok(this.isOnNextCalled, 'On hitting enter, the onNext action is triggered as expected.');
    assert.notOk(this.isOnPreviousCalled, 'Initially OnPreviousCalled is false.');
    await click('[data-test-id="previous"]');
    assert.ok(this.isOnPreviousCalled, 'On hitting previous, the onPrevious action is triggered as expected.');
  });
});
