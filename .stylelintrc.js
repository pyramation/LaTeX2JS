module.exports = {
    processors: ['stylelint-processor-styled-components'],
    extends: [
      'stylelint-config-recommended',
      'stylelint-config-styled-components'
    ],
    rules: {
      'property-no-vendor-prefix': null
    }
  };
  