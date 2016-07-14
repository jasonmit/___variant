import Ember from 'ember';
import uniqBy from '../utils/uniq-by';

const { computed, Controller, isPresent, A:emberA, get, set, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  queryParams: ['selectedVariantId'],

  selectedValues: null,
  selectedVariantId: null,
  variants: computed.readOnly('model.variants'),

  selectedVariant: computed('selectedVariantId', function() {
    let selectedVariantId = get(this, 'selectedVariantId');

    if (isPresent(selectedVariantId)) {
      return get(this, 'store').peekRecord('variant', selectedVariantId);
    }
  }),

  selectedValuesArray: computed('selectedVariant.variantThemeValues', 'selectedValues', function() {
    let selectedVariant = get(this, 'selectedVariant.variantThemeValues');

    if (isPresent(selectedVariant)) {
      return selectedVariant;
    }

    return Array.from(get(this, 'selectedValues').values());
  }),

  variantThemes: computed('model.variants.@each.themes', function() {
    let variants = get(this, 'model.variants');
    let themes = [].concat.apply([], variants.getEach('themes'));

    return uniqBy(themes, 'id');
  }),

  actions: {
    'variant-selected'(value) {
      let id = get(value, 'variantTheme.id');
      let selectedValues = get(this, 'selectedValues');
      let variants = get(this, 'variants');

      if (selectedValues.has(id) && selectedValues.get(id) === value) {
        selectedValues.delete(id);
      } else {
        selectedValues.set(id, value);
      }

      // `selectedValues` is a native Map instance, we're responsible for notifying listeners
      this.notifyPropertyChange('selectedValues');

      let sku = variants.find((variant) => {
        return get(variant, 'variantThemeValues').every((themeValue) => {
          let id = get(themeValue, 'variantTheme.id');

          return selectedValues.has(id) && selectedValues.get(id) === themeValue;
        });
      });

      set(this, 'selectedVariantId', sku ? get(sku, 'id') : null);
    }
  }
});
