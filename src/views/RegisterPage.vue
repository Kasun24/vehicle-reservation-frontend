<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <div class="text-center">
        <h2 class="mb-3"><i class="fas fa-user-plus"></i> Register</h2>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label"><i class="fas fa-user"></i> Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            placeholder="Enter a unique username"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label"><i class="fas fa-lock"></i> Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Create a secure password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">
          <i class="fas fa-user-plus"></i> Register
        </button>
      </form>

      <!-- Login Link -->
      <div class="text-center mt-3">
        <p>
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.js";
import { showSuccess, showError } from "@/utils/alert"; // ✅ Import SweetAlert functions

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await api.post("/auth/register", {
          username: this.username,
          password: this.password,
        });

        // ✅ Show success alert & redirect to login
        showSuccess("Registration successful!", "Redirecting to login...");
        this.username = "";
        this.password = "";

        // ✅ Redirect after 2 seconds
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        // ✅ Show error alert
        showError(error.response?.data?.error || "Registration failed!");
      }
    },
  },
};
</script>
