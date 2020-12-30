module.exports = {
  // 按需引入配置
  presets: [['@babel/preset-env', { modules: false }]],

  plugins: [
    [
      'component',
      {
        libraryName: 'element-plus',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
