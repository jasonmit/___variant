import Ember from 'ember';

const { Component, get, computed } = Ember;

export default Component.extend({
  isVisible: computed.bool('values.length')
});
