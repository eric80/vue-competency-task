const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.s?(a|c)ss', '**/*.vue']
      })
    ]
  }
}
