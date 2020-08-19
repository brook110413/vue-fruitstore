import Vue from 'vue';

Vue.filter('money', (num) => {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${parts.join('.')}`;
});
