module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [obj] = args;
      obj.title = 'Nutrition';
      obj.meta = {
        keywords: '有機蔬果, 水果, 蔬菜, 濃縮果汁, 果汁, 健康, 營養',
        description: '為健康把關，食用有機食物，對自然和自己更健康',
      };
      return args;
    });
  },
};
