import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    /* transform payload into a json-api expected shape */
    /* TODO: incomplete */
    payload.id = payload.code;
    delete payload.code;

    if (Array.isArray(payload.variantOptions)) {
      payload.variantOptions.forEach((variantOption) => {
        variantOption.id = variantOption.code;
        delete variantOption.code;
      });
    }

    if (Array.isArray(payload.variants)) {
      payload.variants.forEach((variant) => {
        variant.id = variant.variantName;
      });
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
