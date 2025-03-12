<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <div class="text-center">
        <h2 class="mb-3">
          <i class="fas fa-sign-in-alt"></i> Login
        </h2>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
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

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
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

        // Store token & role in state
        this.authStore.login(response.data.token, response.data.role);

        this.errorMessage = "";
        this.$router.push("/dashboard"); // Redirect to dashboard
      } catch (error) {
        this.errorMessage = "Invalid username or password.";
      }
    },
  },
};
</script>

