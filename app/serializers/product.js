import Ember from 'ember';
import DS from 'ember-data';

const { String: { capitalize } } = Ember;

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

  normalizeSingleResponse(store, primaryModelClass, hash, id, requestType) {
    /* transform payload into a json-api expected shape */
    let variantThemes = hash.variantThemes.map((theme) => {
      return {
        type: 'variant-theme',
        id: theme.variantName,
        attributes: {
          label: capitalize(theme.variantName)
        }
      };
    });

    let variantThemeValues = hash.variantThemes.reduce((out, theme) => {
      /* NOTE: option here will soon be an object and not a string */
      theme.options.forEach((option) => {
        out.push({
          type: 'variant-theme-value',
          id: option,
          attributes: {
            label: option
          },
          relationships: {
            'variant-theme': {
              data: {
                type: 'variant-theme',
                id: theme.variantName
              }
            }
          }
        });
      });

      return out;
    }, []);

    let variants = hash.variants.map(({ code }) => {
      return {
        type: 'variant',
        id: code,
        relationships: {
          'variant-theme-values': {
            data: this._variantValuesByVariantId(hash.invertedIndex, code)
              .map((variantThemeValue) => {
                return {
                  type: 'variant-theme-value',
                  id: variantThemeValue
                };
              })
          }
        }
      };
    });

    const payload = {
      data: {
        type: 'product',
        id: hash.code,
        attributes: {
          name: hash.name
        },
        relationships: {
          'default-variant': {
            data: {
              type: 'variant',
              id: variants[0].id
            }
          },
          variants: {
            data: variants.map((variant) => {
              return {
                type: 'variant',
                id: variant.id
              };
            })
          }
        }
      },
      included: [].concat(variants, variantThemeValues, variantThemes)
    };

    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
