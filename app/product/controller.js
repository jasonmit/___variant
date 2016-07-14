import Ember from 'ember';
import uniqBy from '../utils/uniq-by';

const { computed, Controller, isPresent, A:emberA, get, set, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  queryParams: ['selectedVariantId'],

  selectedVariantId: null,
  selectedValues: null,
  variants: computed.readOnly('model.variants'),

  selectedVariant: computed('selectedVariantId', function() {
    const selectedVariantId = get(this, 'selectedVariantId');

    if (isPresent(selectedVariantId)) {
      return get(this, 'store').peekRecord('variant', selectedVariantId);
    }
  }),

  selectedValuesArray: computed('selectedVariant', 'selectedValues', function() {
    const selectedVariant = get(this, 'selectedVariant.variantThemeValues');

    if (isPresent(selectedVariant)) {
      return selectedVariant;
    }

    const selectedValues = get(this, 'selectedValues');
    const ret = emberA();

    for (var [key, value] of selectedValues.entries()) {
      ret.pushObject(value);
    }

    return ret;
  }),

  variantThemes: computed('model.variants.@each.themes', function() {
    const variants = get(this, 'model.variants');
    const themes = [].concat.apply([], variants.getEach('themes'));

    return uniqBy(themes, 'id');
  }),

  actions: {
    'variant-selected'(variantThemeType, variantThemeValue) {
      const selectedValues = get(this, 'selectedValues');
      const variants = get(this, 'variants');

      if (selectedValues.has(variantThemeType) && selectedValues.get(variantThemeType) === variantThemeValue) {
        selectedValues.delete(variantThemeType);
      } else {
        selectedValues.set(variantThemeType, variantThemeValue);
      }

      // `selectedValues` is a native Map, so we're responsible for notifying listeners
      this.notifyPropertyChange('selectedValues');

      const sku = variants.find((variant) => {
        return get(variant, 'variantThemeValues').every((themeValue) => {
          const label = get(themeValue, 'variantTheme.label');

          return selectedValues.has(label) && selectedValues.get(label) === themeValue;
        });
      });

      set(this, 'selectedVariantId', sku ? get(sku, 'id') : null);
    }
  }
});
