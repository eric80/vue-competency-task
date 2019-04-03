module.exports = {
  'extends': 'stylelint-config-standard',

  'plugins': [
    '@namics/stylelint-bem'
  ],

  'rules': {
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin']
    }],
    'plugin/stylelint-bem-namics': {
      'patternPrefixes': [],
      'helperPrefixes': []
    }
  }
}
