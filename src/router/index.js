import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MapView from '../views/MapView.vue';
import RegisterView from '../views/RegisterView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ],
});
window.addEventListener('popstate', () => {
  router.push('/');
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(requiresAuth);
  const isMapView = to.name === 'map';
  if (requiresAuth || isMapView) {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated) next('/');
    else next();
  } else {
    next();
  }
});

export default router;
