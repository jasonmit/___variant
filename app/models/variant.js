import Ember from 'ember';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

const { computed, get } = Ember;

export default Model.extend({
  variantThemeValues: hasMany('variant-theme-values'),

  themes: computed('variantThemeValues.@each.variantTheme', function() {
    return get(this, 'variantThemeValues').getEach('variantTheme');
  }).readOnly()
});
