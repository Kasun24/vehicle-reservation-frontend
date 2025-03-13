<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <div class="text-center">
        <h2 class="mb-3">
          <i class="fas fa-sign-in-alt"></i> Login
        </h2>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label"><i class="fas fa-user"></i> Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label"><i class="fas fa-lock"></i> Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
      </form>

      <!-- Register Link -->
      <div class="text-center mt-3">
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";
import { showSuccess, showError } from "@/utils/alert";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/auth/login", {
          username: this.username,
          password: this.password,
        });

        // ✅ Store token & role in state
        this.authStore.login(response.data.token, response.data.role);

        // ✅ Show success message
        showSuccess("Login successful!", "Welcome Back!");

        // ✅ Redirect to dashboard
        this.$router.push("/dashboard");

      } catch (error) {
        // ✅ Show error message with backend response
        showError(error.response?.data?.error || "Invalid username or password!");
      }
    },
  },
};
</script>
