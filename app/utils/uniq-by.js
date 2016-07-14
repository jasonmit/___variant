import Ember from 'ember';

const { get, A:emberA, guidFor } = Ember;

function uniqBy(target, key) {
  const ret = emberA();
  const seen = Object.create(null);

  target.forEach((item) => {
    const guid = guidFor(get(item, key));

    if (!(guid in seen)) {
      seen[guid] = true;
      ret.push(item);
    }
  });

  return ret;
};

export default uniqBy;
