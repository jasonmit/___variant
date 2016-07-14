import Ember from 'ember';

const { computed, get } = Ember;

const ItemComponent = Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['title'],
  classNames: ['picker-item'],
  classNameBindings: ['active', 'label', 'available::disabled'],
  title: computed.readOnly('value.label'),
  value: null,
  active: computed('selected.[]', 'value', function() {
    return get(this, 'selected').contains(get(this, 'value'));
  }),
  available: computed('availableValues.[]', 'value', function() {
    return Ember.A(get(this, 'availableValues')).contains(get(this, 'value'));
  }),
  label: computed('value.label', function() {
    return (get(this, 'value.label') + '').toLowerCase();
  }),
  click() {
    return this.attrs['on-change'](get(this, 'value'));
  }
});

ItemComponent.reopenClass({
  positionalParams: ['value']
});

export default ItemComponent;
