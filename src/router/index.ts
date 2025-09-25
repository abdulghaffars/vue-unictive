import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, refreshToken } from '../utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/recipe-list',
      name: 'recipe-list',
      component: () => import('../views/RecipeListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/recipe/:id',
      name: 'recipe-list-detail',
      component: () => import('../views/DetailRecipe.vue'),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

//Auth guard
router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth)
  const guestOnly = to.matched.some((r) => r.meta?.guestOnly)

  if (requiresAuth) {
    const ok = await isAuthenticated()
    if (!ok) {
      const refreshed = await refreshToken()
      if (refreshed) {
        return
      } else {
        return { name: 'login', query: { redirect: to.fullPath } }
      }
    }
  }

  if (guestOnly) {
    const ok = await isAuthenticated()
    if (ok) {
      return { name: 'home' }
    }
  }
})

export default router
