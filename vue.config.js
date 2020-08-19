module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [obj] = args;
      obj.title = 'Nutrition';
      // obj.meta = {
      //   keywords: '線上課程, 網頁設計, 前端, HTML, CSS, jQuery, javascript',
      //   description: ' 打破影音課程售後不理，我們在線上等著你。 ',
      // };
      // obj.icon = 'nutrition.svg';
      return args;
    });
  },
};
