import { createRouter, createWebHistory } from 'vue-router';

// setup VueRouter
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/HomePage.vue') },
    {
      path: '/admin',
      component: () => import('./pages/admin/AdminApp.vue'), 
      children: [
        { path: '/admin/home', component: () => import('./pages/admin/HomePage.vue') },
        { path: '/admin/register', component: () => import('./pages/admin/RegisterPage.vue') },
        { path: '/admin/list', component: () => import('./pages/admin/StudentListPage.vue') },
        { path: '/admin/createPaper', component: () => import('./pages/admin/createPaperPage.vue') },
      ],
    },
    { path: '/login', component: () => import('./pages/account/LoginPage.vue') },
    { path: '/user/:id', component: () => import('./pages/account/ProfilePage.vue') },
    { path: '/list', component: () => import('./pages/paper/ListPage.vue') },
    { path: '/paper/:id', component: () => import('./pages/paper/ContentPage.vue') },
    { path: '/group', component: () => import('./pages/GroupPage.vue') },
    { path: '/feedback', component: () => import('./pages/FeedBackPage.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFoundPage.vue') },
  ],
});

export default router;