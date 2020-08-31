import Model, { attr } from '@ember-data/model';

export default class QuestionnaireModel extends Model {
  @attr('string') identifier;
  @attr('string') name;
  @attr('string') description;
  @attr('string') categoryName;
  @attr questions;
}
