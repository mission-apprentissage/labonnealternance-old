// https://on.cypress.io/plugins-guide

module.exports = (on, config) => {
  
  // const webpackPreprocessor = require('@cypress/webpack-preprocessor')
  // const options = {
  //   webpackOptions: {
  //     module: {
  //       rules: [
  //         {
  //           test: /\.jsx?$/,
  //           exclude: [/node_modules/],
  //           use: [{
  //             loader: 'babel-loader',
  //             options: {
  //               presets: ['next/babel'],
  //               plugins: ['istanbul'],
  //             },
  //           }],
  //         },
  //       ],
  //     },
  //   },
  //   watchOptions: {},
  // }
  // on('file:preprocessor', webpackPreprocessor(options))

  require('@cypress/code-coverage/task')(on, config)
  
  
  // const browserifyPreprocessor = require('@cypress/browserify-preprocessor')
  // const options = {
  //   extensions: ['.js', '.jsx', '.coffee'],
  //   transform: [
  //     [
  //       'coffeeify',
  //       {}
  //     ],
  //     [
  //       'babelify',
  //       {
  //         ast: false,
  //         babelrc: false,
  //         plugins: [
  //           'istanbul',
  //         ],
  //         presets: [
  //           'next/babel'
  //         ]
  //       },
  //     ]
  //   ],
  //   debug: true,
  //   plugin: [],
  //   cache: {},
  //   packageCache: {}
  // }
  // on('file:preprocessor', browserifyPreprocessor(options))



  return config
}
