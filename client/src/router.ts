import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'top',
    component: async () => {
      const top = await import('./pages/Top.vue');
      return top;
    }
  },
  {
    path: '/login',
    name: 'login',
    component: async () => {
      const login = await import('./pages/Login.vue');
      return login;
    }
  },
  {
    path: '/shop/1',
    name: 'shopDetail',
    component: async () => {
      const shopDetail = await import('./pages/ShopDetail.vue');
      return shopDetail;
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;