module.exports = {
  data: {
    type: 'product',
    id: 'FOOBAR',
    attributes: {
      name: 'Product Name',
    },
    relationships: {
      'default-variant': {
        data: {
          type: 'variant',
          id: 'FB-WHITE-BATTERY'
        }
      },
      variants: {
        data: [{
          type: 'variant',
          id: 'FB-WHITE-BATTERY'
        }, {
          type: 'variant',
          id: 'FB-WHITE-BATTERY-3P'
        }, {
          type: 'variant',
          id: 'FB-WHITE-BATTERY-2P'
        }, {
          type: 'variant',
          id: 'FB-BLACK-BATTERY'
        }, {
          type: 'variant',
          id: 'FB-WHITE-WIRED'
        }, {
          type: 'variant',
          id: 'FB-BLACK-WIRED'
        }, {
          type: 'variant',
          id: 'FB-SILVER-WIRED'
        }]
      }
    }
  },
  included: [{
    type: 'variant',
    id: 'FB-WHITE-BATTERY',
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
    id: 'FB-WHITE-BATTERY-3P',
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
    id: 'FB-WHITE-BATTERY-2P',
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
    id: 'FB-BLACK-BATTERY',
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
    id: 'FB-WHITE-WIRED',
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
    id: 'FB-BLACK-WIRED',
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
    id: 'FB-SILVER-WIRED',
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
};
