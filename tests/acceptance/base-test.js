import { module, test } from 'qunit';
import { click, currentRouteName, fillIn, find, findAll, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | Base', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Basic workflow of questionnaire demo', async function(assert) {
    // eslint-disable-next-line no-undef
    const { questionnaires } = server.db;
    await visit('/');
    assert.equal(currentRouteName(), 'questionnaires.index', 'Navigated to default list route.');
    assert.equal(findAll('div[role="link"]').length, questionnaires.length, 'All rows are rendered.');
    await click('[data-test-id="questionnaire-39"]');
    assert.equal(currentRouteName(), 'questionnaires.details', 'Navigated to details route on clicking the link');
    assert.ok(find('[data-test-id="next"]'), 'Next button is shown.');
    assert.notOk(find('[data-test-id="previous"]'), 'Previous button is not shown since this is the first question.');
    assert.ok(find('[data-test-id="question-text-01"]'), 'First question is rendered');
    assert.ok(find('[data-test-id="text-field"]'), 'Since the first question is a text field, it is rendered.');
    await fillIn('[data-test-id="text-field"]', 'John Doe');
    await click('[data-test-id="next"]');
    assert.ok(find('[data-test-id="question-list-01"]'), 'On clicking "Next", second question is rendered.');
    await click('[data-test-id="radio-button-car"]');
    assert.ok(find('[data-test-id="question-list-02"]'), 'Third question is rendered on clicking a radio option.');
    await click('[data-test-id="radio-button-yes"]');
    assert.ok(find('[data-test-id="question-text-02"]'), 'Previous policy text field is rendered since the answer to the current question is yes.');
    assert.ok(find('[data-test-id="text-field"]'), 'Text field is rendered.');
    await click('[data-test-id="previous"]');
    assert.ok(find('[data-test-id="question-list-02"]'), 'Previous question is rendered on clicking back');
    await click('[data-test-id="radio-button-no"]');
    assert.notOk(find('[data-test-id="text-field"]'), 'Text field is not rendered since the answer is No.');
    assert.ok(find('[data-test-id="question-list-03"]'), 'Next question is rendered since the answer to the current question is No.');
    await click('[data-test-id="checkbox-third_party"]');
    await click('[data-test-id="next"]');
    assert.ok(find('textarea'), 'Last question is rendered.');
    assert.ok(find('[data-test-id="save"]'), 'Save button is rendered on reaching the last question.');
    await fillIn('textarea', 'Hello World');

    // Traversing back and forth to check if the answers are retained.
    await click('[data-test-id="previous"]');
    assert.ok(find('[data-test-id="checkbox-third_party"]').checked, 'Selected option is retained');
    assert.notOk(find('[data-test-id="checkbox-own_damage"]').checked, 'Option which is not selected earlier is left as is.');
    await click('[data-test-id="previous"]');
    assert.ok(find('[data-test-id="radio-button-no"] input').checked, 'Selected radio option is checked correctly.');
    await click('[data-test-id="previous"]');
    assert.ok(find('[data-test-id="radio-button-car"] input'), 'Selected radio button is checked correctly.');
    await click('[data-test-id="next"]');
    await click('[data-test-id="next"]');
    assert.ok(find('[data-test-id="checkbox-third_party"]').checked, 'Selected option is retained');
    await click('[data-test-id="next"]');
    await click('[data-test-id="save"]');
    assert.equal(currentRouteName(), 'questionnaires.index', 'Navigated to list route after saving the answers.');
  });
});