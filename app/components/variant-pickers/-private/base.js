import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  isVisible: computed.bool('values.length'),
  values: computed.readOnly('theme.values'),

  _selectedValues: computed('selectedValues.[]', 'theme', function() {
    let themeId = get(this, 'theme.id');

    if (themeId) {
      return Ember.A(get(this, 'selectedValues')).filter((value) => {
        // TODO: I should be able to compare refs here, but
        // they are not referencing the same object <shrug>
        return get(value, 'variantTheme.id') === themeId;
      });
    }
  })
});
