import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth"; // Import Pinia store
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import AdminPage from "@/views/AdminPage.vue";
import UserManagement from "@/views/UserManagement.vue";
import VehicleManagement from "@/views/VehicleManagement.vue";
import BookingManagement from "@/views/BookingManagement.vue";
import ReportManagement from "@/views/ReportManagement.vue";
import DriverManagement from "@/views/DriverManagement.vue";
import PaymentManagement from "@/views/PaymentManagement.vue";
import HelpPage from "@/views/HelpPage.vue";
import UserBookings from "@/views/UserBookings.vue";
import UserProfile from "@/views/UserProfile.vue";

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
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/users",
    component: UserManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/vehicles",
    component: VehicleManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/drivers",
    component: DriverManagement,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/bookings",
    component: BookingManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/payments",
    component: PaymentManagement,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/reports",
    component: ReportManagement,
    meta: { requiresAuth: true },
  },
  { path: "/help", component: HelpPage },
  { path: "/my-bookings", component: UserBookings, meta: { requiresAuth: true } },
  { path : "/profile", component: UserProfile, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔹 Navigation Guard for Authentication & Role-Based Access
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Use Pinia store
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.userRole;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect to login if not authenticated
  } else if (to.meta.requiresAdmin && userRole !== "ADMIN") {
    next("/dashboard"); // Redirect non-admin users
  } else {
    next(); // Allow access
  }
});

export default router;
