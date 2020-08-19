import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Index.vue'),
      },
      {
        path: '/products/:category',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        // 動態路由
        path: '/product/:id',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: '/favorite',
        component: () => import('../views/frontend/Favorite.vue'),
      },
      {
        path: '/search/keyword/:keyword',
        component: () => import('../views/frontend/Search.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: '/order',
        component: () => import('../views/frontend/Order.vue'),
      },
      {
        path: '/checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: '/complete',
        component: () => import('../views/frontend/Complete.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/dashboard/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/Coupons.vue'),
      },
      {
        path: 'storages',
        component: () => import('../views/dashboard/Storages.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
