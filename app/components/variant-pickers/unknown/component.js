import BaseComponent from '../-private/base';

export default BaseComponent.extend({
  actions: {
    change(value) {
      return this.attrs['variant-selected'](value);
    }
  }
});
