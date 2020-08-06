import Vue from 'vue';
import Vue2Editor from 'vue2-editor';
import {
  configure, ValidationProvider, ValidationObserver, extend,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/zh_TW.json';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import App from './App.vue';
import router from './router';
import './bus';

Vue.config.productionTip = false;

// 插件
Vue.use(Vue2Editor);
// vue-loading-overlay
Vue.component('Loading', Loading);
// axios
Vue.use(VueAxios, axios);
// 載入font-awesome
library.add(fas);
// 載入font-awesome
Vue.component('font-awesome-icon', FontAwesomeIcon);
extend('secret', {
  validate: (value) => value === 'example',
  message: 'This is not the magic word',
});
// 載入vee input和form驗證
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
// 載入vee全部的rules和錯誤提示
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});
// 載入vee 錯誤樣式
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
// 數字千分號
Vue.filter('money', (num) => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${parts.join('.')}`;
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
