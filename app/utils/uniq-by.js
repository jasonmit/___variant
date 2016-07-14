import Ember from 'ember';

const { get, A:emberA, guidFor } = Ember;

function uniqBy(target, key) {
  const seen = Object.create(null);

  return target.reduce((ret, item) => {
    const guid = guidFor(get(item, key));

    if (!(guid in seen)) {
      seen[guid] = true;
      ret.push(item);
    }

    return ret;
  }, emberA());
}

export default uniqBy;
