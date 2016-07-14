import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  isVisible: computed.bool('values.length'),

  _values: computed('values', 'selectedValues', function() {
    // TODO: finish this..
    let selected = get(this, 'selectedValues');

    return get(this, 'values');
  })
});
