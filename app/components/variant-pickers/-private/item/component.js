import Ember from 'ember';

const { computed, get } = Ember;

const ItemComponent = Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['title'],
  classNames: ['picker-item'],
  classNameBindings: ['active', 'label'],
  title: computed.readOnly('value.label'),
  value: null,
  active: computed('selected.[]', 'value', function() {
    return get(this, 'selected').contains(get(this, 'value'));
  }),
  label: computed('value.label', function() {
    return (get(this, 'value.label') + '').toLowerCase();
  }),
  click() {
    const value = get(this, 'value');
    const variantTheme = get(value, 'variantTheme.label');

    return this.attrs['on-change'](value);
  }
});

ItemComponent.reopenClass({
  positionalParams: ['value']
});

export default ItemComponent;
