import { RouteRecordRaw } from 'vue-router';
import GameplayVue from 'pages/GamePlay/GamePlay.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/Gameplay',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => GameplayVue,
        name: 'GameplayVue',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
