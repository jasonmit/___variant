import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  isVisible: computed.bool('values.length')
});
