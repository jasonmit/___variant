import Ember from 'ember';

const { inject, get, set } = Ember;

export default Ember.Route.extend({
  store: inject.service(),

  model() {
    return get(this, 'store').find('product', 'TL');
  },

  setupController(controller, model) {
    this._super(...arguments);

    const defaultVariantId = get(model, 'defaultVariant.id');

    if (defaultVariantId && get(model, 'id') !== defaultVariantId) {
      this.transitionTo({
        queryParams: {
          selectedVariantId: defaultVariantId
        }
      });
    }

    set(controller, 'selectedValues', new Map());
  }
});
