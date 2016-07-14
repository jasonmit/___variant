import Ember from 'ember';

const { computed, isPresent, A:emberA, get, set, guidFor, inject } = Ember;

export default Ember.Controller.extend({
  store: inject.service(),
  queryParams: ['selectedVariantId'],

  selection: null,
  selectedVariantId: null,
  variants: computed.readOnly('model.variants'),

  selectedVariant: computed('selectedVariantId', function() {
    const selectedVariantId = get(this, 'selectedVariantId');

    if (isPresent(selectedVariantId)) {
      return get(this, 'store').peekRecord('variant', selectedVariantId);
    }
  }),

  selectionArray: computed('selection', function() {
    const selection = get(this, 'selection');
    const ret = emberA();

    for (var [key, value] of selection.entries()) {
      ret.pushObject({
        key,
        value
      });
    }

    return ret;
  }),

  variantThemes: computed('model.variants.@each.themes', function() {
    const variants = get(this, 'model.variants');
    const themes = [].concat.apply([], variants.getEach('themes'));

    return this.uniqBy(themes, 'id');
  }),

  actions: {
    'variant-selected'(key, variantThemeValue) {
      const selection = get(this, 'selection');
      const variants = get(this, 'variants');

      if (selection.has(key) && selection.get(key) === variantThemeValue) {
        selection.delete(key);
      } else {
        selection.set(key, variantThemeValue);
      }

      // `selection` is a native Map, so we're responsible for notifying listeners
      this.notifyPropertyChange('selection');

      const sku = variants.find((variant) => {
        return get(variant, 'variantThemeValues').every((themeValue) => {
          const label = get(themeValue, 'variantTheme.label');

          return selection.has(label) && selection.get(label) === themeValue;
        });
      });

      set(this, 'selectedVariantId', get(sku, 'id'));
    }
  },

  uniqBy(target, key) {
    const ret = emberA();
    const seen = Object.create(null);

    target.forEach((item) => {
      const guid = guidFor(get(item, key));

      if (!(guid in seen)) {
        seen[guid] = true;
        ret.push(item);
      }
    });

    return ret;
  }
});
