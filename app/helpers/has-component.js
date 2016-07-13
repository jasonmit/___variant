import Ember from 'ember';

const { getOwner, Helper } = Ember;

export default Helper.extend({
  compute([lookupName]) {
    return getOwner(this).hasRegistration(`component:${lookupName}`);
  }
});
