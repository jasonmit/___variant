import Ember from 'ember';
import uniqBy from '../utils/uniq-by';

const { computed, Controller, isPresent, A:emberA, get, set, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  queryParams: ['selectedVariantId'],

  _selectedValues: null,

  selectedValues: computed('_selectedValues', function() {
    let map = get(this, '_selectedValues');

    return Array.from(map.values());
  }),

  selectedVariantId: null,
  variants: computed.readOnly('model.variants'),

  selectedVariant: computed('selectedVariantId', function() {
    let selectedVariantId = get(this, 'selectedVariantId');

    if (isPresent(selectedVariantId)) {
      return get(this, 'store').peekRecord('variant', selectedVariantId);
    }
  }),

  variantThemes: computed('model.variants.@each.themes', function() {
    let variants = get(this, 'model.variants');
    let themes = [].concat.apply([], variants.getEach('themes'));

    return uniqBy(themes, 'id');
  }),

  toggleVariantValue(value) {
    let themeId = get(value, 'variantTheme.id');
    let selectedValues = get(this, '_selectedValues');

    if (selectedValues.has(themeId) && selectedValues.get(themeId) === value) {
      selectedValues.delete(themeId);
    } else {
      selectedValues.set(themeId, value);
    }

    this.notifyPropertyChange('_selectedValues');
  },

  actions: {
    'variant-selected'(value) {
      let variants = get(this, 'variants');
      let selectedValues = get(this, '_selectedValues');

      this.toggleVariantValue(value);

      let sku = variants.find((variant) => {
        if (get(variant, 'variantThemeValues.length') !== selectedValues.size) {
          return false;
        }

        return get(variant, 'variantThemeValues').every((value) => {
          let themeId = get(value, 'variantTheme.id');

          return selectedValues.get(themeId) === value;
        });
      });

      set(this, 'selectedVariantId', sku ? get(sku, 'id') : null);
    }
  }
});
