<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Vehicle Reservation</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <!-- Home -->
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="fas fa-home"></i> Home
            </router-link>
          </li>

          <!-- Login (Only if not authenticated) -->
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link class="nav-link" to="/login">
              <i class="fas fa-sign-in-alt"></i> Login
            </router-link>
          </li>

          <!-- Register (Only if not authenticated) -->
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link class="nav-link" to="/register">
              <i class="fas fa-user-plus"></i> Register
            </router-link>
          </li>

          <!-- User Dashboard (For Users) -->
          <li
            class="nav-item"
            v-if="authStore.isAuthenticated && authStore.userRole === 'USER'"
          >
            <router-link class="nav-link" to="/dashboard">
              <i class="fas fa-tachometer-alt"></i> Dashboard
            </router-link>
          </li>

          <!-- Admin Panel (For Admins) -->
          <li
            class="nav-item"
            v-if="authStore.isAuthenticated && authStore.userRole === 'ADMIN'"
          >
            <router-link class="nav-link" to="/admin">
              <i class="fas fa-user-shield"></i> Admin Panel
            </router-link>
          </li>

          <!-- Help -->
          <li class="nav-item">
            <router-link class="nav-link" to="/help">
              <i class="fas fa-question-circle"></i> Help
            </router-link>
          </li>

          <!-- Logout Button (Only if authenticated) -->
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <button class="btn btn-danger" @click="logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth"; // Import the auth store

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.$router.push("/login");
    },
  },
};
</script>
