import Ember from 'ember';
import uniqBy from '../utils/uniq-by';

const { computed, Controller, isPresent, get, set, inject } = Ember;

export default Controller.extend({
  store: inject.service(),
  queryParams: ['selectedVariantId'],

  _selectedValues: null,
  selectedVariantId: null,
  variants: computed.readOnly('model.variants'),

  selectedValues: computed('_selectedValues', function() {
    let map = get(this, '_selectedValues');

    return Array.from(map.values());
  }),

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

  availableVariants: computed('model.variants.@each.themes', '_selectedValues', function() {
    let selectedValues = get(this, '_selectedValues');
    let variants = get(this, 'model.variants');
    let size = selectedValues.size;

    if (size) {
      let found = variants.filter((variant) => {
        let values = get(variant, 'variantThemeValues');
        let len = get(values, 'length');

        // fast escape valve
        if (size > len) {
          return false;
        }

        if (size === len) {
          return compare(selectedValues, values);
        }

        return values.every((value) => {
          let themeId = get(value, 'variantTheme.id');

          if (selectedValues.has(themeId) && selectedValues.get(themeId) !== value) {
            return false;
          }

          return true;
        });
      });

      console.log('available', found.getEach('id'));

      return found;
    }

    return Ember.A();
  }).readOnly(),

  availableVariantValues: computed('availableVariants.[]', function() {
    const availableVariants = Ember.A(get(this, 'availableVariants'));

    return availableVariants.getEach('variantThemeValues').reduce((ret, values) => {
      ret.addObjects(values.toArray());

      return ret;
    }, Ember.A());
  }).readOnly(),

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

  lookupVariantByValues(values) {
    let variants = get(this, 'variants');

    return variants.find((variant) => {
      if (get(variant, 'variantThemeValues.length') !== values.size) {
        return false;
      }

      return get(variant, 'variantThemeValues').every((value) => {
        let themeId = get(value, 'variantTheme.id');

        return values.get(themeId) === value;
      });
    });
  },

  actions: {
    'variant-selected'(value) {
      let variants = get(this, 'variants');
      let selectedValues = get(this, '_selectedValues');

      if (!get(this, 'availableVariantValues').contains(value)) {
        selectedValues.clear();
      }

      this.toggleVariantValue(value);

      let sku = this.lookupVariantByValues(selectedValues);

      set(this, 'selectedVariantId', sku ? get(sku, 'id') : null);
    }
  }
});

function compare(a, b) {
  if (a.length != b.length) {
    return false;
  }

  for (var i = 0; i < b.length; i++) {
    if (Array.isArray(a[i])) {
      if (!compare(a[i], b[i])) {
        return false;
      }
    }

    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
