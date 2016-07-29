module.exports = {
  "id": "FOOBAR",
  "variants": [
    {
      "variantName": "Color",
      "options": [
        "white",
        "black"
      ]
    },
    {
      "variantName": "Power",
      "options": [
        "battery",
        "wired"
      ]
    }
  ],
  "variantOptions": [
    {
      "stock": {
        "stockLevelStatus": {
          "code": "inStock",
          "codeLowerCase": "instock"
        }
      },
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      },
      "code": "FB0BBES"
    },
    {
      "stock": {
        "stockLevelStatus": {
          "code": "inStock",
          "codeLowerCase": "instock"
        }
      },
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      },
      "code": "FB0BWES"
    },
    {
      "stock": {
        "stockLevelStatus": {
          "code": "inStock",
          "codeLowerCase": "instock"
        }
      },
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      },
      "code": "FB3LBES"
    },
    {
      "stock": {
        "stockLevelStatus": {
          "code": "inStock",
          "codeLowerCase": "instock"
        }
      },
      "priceData": {
        "currencyIso": "USD",
        "priceType": "BUY",
        "value": "99.0",
        "formattedValue": "$99.00"
      },
      "code": "FB3LWES"
    }
  ],
  "invertedIndex": [
    {
      "variant": "battery",
      "candidates": [
        "FB0BWES",
        "FB0BBES"
      ]
    },
    {
      "variant": "white",
      "candidates": [
        "FB0BWES",
        "FB3LWES"
      ]
    },
    {
      "variant": "wired",
      "candidates": [
        "FB3LWES",
        "FB3LBES"
      ]
    },
    {
      "variant": "black",
      "candidates": [
        "FB0BBES",
        "FB3LBES"
      ]
    }
  ]
};
