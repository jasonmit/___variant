/*jshint node:true*/

module.exports = function(app) {
  var express = require('express');
  var productRouter = express.Router();

  productRouter.get('/:id', function(req, res) {
    res.send({
      data: {
        type: 'product',
        id: req.params.id,
        attributes: {
          name: 'Product Name',
        },
        relationships: {
          'default-variant': {
            data: {
              type: 'variant',
              id: 'TL-WHITE-BATTERY'
            }
          },
          variants: {
            data: [{
              type: 'variant',
              id: 'TL-WHITE-BATTERY'
            }, {
              type: 'variant',
              id: 'TL-WHITE-BATTERY-3P'
            }, {
              type: 'variant',
              id: 'TL-WHITE-BATTERY-2P'
            }, {
              type: 'variant',
              id: 'TL-BLACK-BATTERY'
            }, {
              type: 'variant',
              id: 'TL-WHITE-WIRED'
            }, {
              type: 'variant',
              id: 'TL-BLACK-WIRED'
            }, {
              type: 'variant',
              id: 'TL-SILVER-WIRED'
            }]
          }
        }
      },
      included: [{
        type: 'variant',
        id: 'TL-WHITE-BATTERY',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 1
            }, {
              type: 'variant-theme-value',
              id: 4
            }]
          }
        }
      }, {
        type: 'variant',
        id: 'TL-WHITE-BATTERY-3P',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 1
            }, {
              type: 'variant-theme-value',
              id: 4
            }, {
              type: 'variant-theme-value',
              id: 6
            }]
          }
        }
      }, {
        type: 'variant',
        id: 'TL-WHITE-BATTERY-2P',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 1
            }, {
              type: 'variant-theme-value',
              id: 4
            }, {
              type: 'variant-theme-value',
              id: 7
            }]
          }
        }
      }, {
        type: 'variant',
        id: 'TL-BLACK-BATTERY',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 2
            }, {
              type: 'variant-theme-value',
              id: 4
            }]
          }
        }
      }, {
        type: 'variant',
        id: 'TL-WHITE-WIRED',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 1
            }, {
              type: 'variant-theme-value',
              id: 3
            }]
          }
        }
      }, {
        type: 'variant',
        id: 'TL-BLACK-WIRED',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 2
            }, {
              type: 'variant-theme-value',
              id: 3
            }]
          }
        }
      }, {
        type: 'variant',
        id: 'TL-SILVER-WIRED',
        relationships: {
          'variant-theme-values': {
            data: [{
              type: 'variant-theme-value',
              id: 5
            }, {
              type: 'variant-theme-value',
              id: 3
            }]
          }
        }
      }, {
        type: 'variant-theme',
        id: 1,
        attributes: {
          label: 'Color'
        }
      }, {
        type: 'variant-theme',
        id: 2,
        attributes: {
          label: 'Power'
        }
      }, {
        type: 'variant-theme',
        id: 3,
        attributes: {
          label: 'Pack'
        }
      }, {
        type: 'variant-theme-value',
        id: 1,
        attributes: {
          label: 'White'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 1
            }
          }
        }
      }, {
        type: 'variant-theme-value',
        id: 5,
        attributes: {
          label: 'Silver'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 1
            }
          }
        }
      }, {
        type: 'variant-theme-value',
        id: 2,
        attributes: {
          label: 'Black'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 1
            }
          }
        }
      }, {
        type: 'variant-theme-value',
        id: 3,
        attributes: {
          label: 'Wired'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 2
            }
          }
        }
      }, {
        type: 'variant-theme-value',
        id: 4,
        attributes: {
          label: 'Battery'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 2
            }
          }
        }
      }, {
        type: 'variant-theme-value',
        id: 6,
        attributes: {
          label: 'Three pack'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 3
            }
          }
        }
      }, {
        type: 'variant-theme-value',
        id: 7,
        attributes: {
          label: 'Two pack'
        },
        relationships: {
          'variant-theme': {
            data: {
              type: 'variant-theme',
              id: 3
            }
          }
        }
      }]
    });
  });

  app.use('/api/products', productRouter);
};
