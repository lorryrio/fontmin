const plugins = ['@vue/babel-plugin-transform-vue-jsx'];

if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}

module.exports = {
  plugins,
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
};
