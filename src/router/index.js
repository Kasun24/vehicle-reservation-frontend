import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import AdminPage from "@/views/AdminPage.vue"; // New admin page

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    component: AdminPage,
    meta: { requiresAuth: true, requiresAdmin: true }, // Admin only
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Protected & Role-Based Routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect if not logged in
  } else if (to.meta.requiresAdmin && userRole !== "ADMIN") {
    next("/dashboard"); // Redirect non-admin users
  } else {
    next(); // Allow access
  }
});

export default router;
