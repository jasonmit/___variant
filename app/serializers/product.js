import Ember from 'ember';
import DS from 'ember-data';

const { String: { capitalize } } = Ember;

class Node {
  constructor(type, id, attributes, relationships) {
    this.type = type;
    this.id = id;
    this.attributes = attributes;
    this.relationships = relationships;
  }
}

export default DS.JSONAPISerializer.extend({
  _variantValuesByVariantId(payload, variantId) {
    return payload.reduce((out, { candidates, variantThemeValue }) => {
      candidates.forEach((id) => {
        if (id === variantId) {
          out.push(variantThemeValue);
        }
      });

      return out;
    }, []);
  },

  /*
   * Transform payload into expected json-api shape
   *
   * @public
   */
  normalizeSingleResponse(store, primaryModelClass, hash, id, requestType) {
    const variantThemes = hash.variantThemes.map((theme) => {
      return new Node('variant-theme', theme.variantName, {
        label: capitalize(theme.variantName)
      });
    });

    const variantThemeValues = hash.variantThemes.reduce((out, theme) => {
      /* NOTE: `option` here will soon be an object and not a string */
      theme.options.forEach((option) => {
        out.push(new Node('variant-theme-value', option, {
          label: option
        }, {
          'variant-theme': {
            data: new Node('variant-theme', theme.variantName)
          }
        }));
      });

      return out;
    }, []);

    const variants = hash.variants.map(({ code }) => {
      return new Node('variant', code, {}, {
        'variant-theme-values': {
          data: this._variantValuesByVariantId(hash.invertedIndex, code)
            .map((value) => new Node('variant-theme-value', value))
          }
        });
    });

    const payload = {
      data: new Node('product', hash.code, {
        name: hash.name
      }, {
        'default-variant': {
          data: new Node('variant', variants[0].id)
        },
        variants: {
          data: variants.map(({ id }) => new Node('variant', id))
        }
      }),
      included: [...variants, ...variantThemes, ...variantThemeValues]
    };

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
