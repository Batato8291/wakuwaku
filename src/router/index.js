import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/forestage/UserBoard.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/forestage/HomeView.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/forestage/UserLogin.vue'),
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/forestage/SearchPage.vue'),
      },
      {
        path: 'product/:productId',
        name: 'ProductPage',
        component: () => import('../views/forestage/ProductPage.vue'),
      },
      {
        path: 'article/:articleId',
        name: 'ArticlePage',
        component: () => import('../views/forestage/UserArticle.vue'),
      },
      {
        path: 'favors',
        name: 'Favors',
        component: () => import('../views/forestage/UserFavors.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/forestage/UserCart.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/forestage/UserOrder.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: 'CheckOut',
        component: () => import('../views/forestage/UserCheckout.vue'),
      },
      {
        path: 'order-done/:orderId',
        name: 'OrderDone',
        component: () => import('../views/forestage/UserOrderDone.vue'),
      },
    ],
  },

  {
    path: '/adminboard',
    component: () => import('../views/backstage/AdminBoard.vue'),
    children: [
      {
        path: 'articles',
        component: () => import('../views/backstage/ArticleList.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/backstage/ProductsList.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backstage/CouponsList.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backstage/OrdersList.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/backstage/AdminLogin.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/ErrorPage.vue'),
    meta: {
      title: '404 Not Found ',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
