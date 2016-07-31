module.exports = {
  "code": "FOOBAR",
  "name": "Product Name",
  "variants": [
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
  "variantOptions": [
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
