import Ember from 'ember';

const { computed, get, isEmpty, Component } = Ember;

const ItemComponent = Component.extend({
  tagName: 'button',
  attributeBindings: ['title'],
  classNames: ['picker-item'],
  classNameBindings: ['active', 'label', 'available::disabled'],
  title: computed.readOnly('value.label'),
  value: null,

  active: computed('selected.[]', 'value', function() {
    return Ember.A(get(this, 'selected')).contains(get(this, 'value'));
  }),

  available: computed('availableValues.[]', 'value', function() {
    let available = get(this, 'availableValues');

    if (isEmpty(available)) {
      return true;
    }

    return Ember.A(get(this, 'availableValues')).contains(get(this, 'value'));
  }),

  label: computed('value.label', function() {
    return Ember.String.dasherize(get(this, 'value.label'));
  }),

  click() {
    return this.attrs['on-change'](get(this, 'value'));
  }
});

ItemComponent.reopenClass({
  positionalParams: ['value']
});

export default ItemComponent;
