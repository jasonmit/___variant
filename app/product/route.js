import Ember from 'ember';

const { inject, get, set } = Ember;

export default Ember.Route.extend({
  store: inject.service(),

  model() {
    return get(this, 'store').find('product', 'TL');
  },

  setupController(controller) {
    this._super(...arguments);

    set(controller, 'selectedValues', new Map());
  }
});
