module.exports = {
  babelrc: false,
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
        browsers: '',
      },
      useBuiltIns: 'entry',
      shippedProposals: true,
    }],
    '@babel/flow',
  ],
}
