import Ember from 'ember';

const { Component, get, isPresent, computed } = Ember;

export default Component.extend({
  isVisible: computed.bool('values.length'),

  _selectedValues: computed('selectedValues.[]', 'theme', function() {
    let themeId = get(this, 'theme.id');

    if (themeId) {
      return Ember.A(get(this, 'selectedValues')).filter((value) => {
        return get(value, 'variantTheme.id') === themeId;
      });
    }
  })
});
