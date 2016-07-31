/*
 * BREAKING CHANGES:
 * renamed variants to variantThemes
 * renamed variantOptions to variants
 * renamed variant inside invertedIndex to variantThemeValue
 */
module.exports = {
  "code": "FOOBAR",
  "name": "Product Name",
  "variantThemes": [
    {
      "variantName": "color",
      "options": [
        "white",
        "black"
      ]
    },
    {
      "variantName": "power",
      "options": [
        "battery",
        "wired"
      ]
    }
  ],
  "variants": [
    {
      "code": "FB0BBES",
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      }
    },
    {
      "code": "FB0BWES",
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      }
    },
    {
      "code": "FB3LBES",
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      }
    },
    {
      "code": "FB3LWES",
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      }
    }
  ],
  "invertedIndex": [
    {
      "variantThemeValue": "battery",
      "candidates": [
        "FB0BWES",
        "FB0BBES"
      ]
    },
    {
      "variantThemeValue": "white",
      "candidates": [
        "FB0BWES",
        "FB3LWES"
      ]
    },
    {
      "variantThemeValue": "wired",
      "candidates": [
        "FB3LWES",
        "FB3LBES"
      ]
    },
    {
      "variantThemeValue": "black",
      "candidates": [
        "FB0BBES",
        "FB3LBES"
      ]
    }
  ]
};
