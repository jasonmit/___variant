import Ember from 'ember';

const { inject, get, set } = Ember;

export default Ember.Route.extend({
  store: inject.service(),

  model() {
    return get(this, 'store').find('product', 'FOOBAR');
  },

  setupController(controller, model, { queryParams }) {
    this._super(...arguments);

    const defaultVariantId = get(model, 'defaultVariant.id');

    set(controller, '_selectedValues', new Map());

    if (defaultVariantId && get(model, 'id') !== defaultVariantId) {
      this.transitionTo({
        queryParams: {
          selectedVariantId: defaultVariantId
        }
      });
    }

    let variantId = get(queryParams, 'selectedVariantId') || defaultVariantId;
    let variant = get(this, 'store').peekRecord('variant', variantId);
    let variantThemeValues = get(variant, 'variantThemeValues');

    variantThemeValues.forEach((value) => controller.toggleVariantValue(value));
  }
});
