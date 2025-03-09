<template>
  <div class="container">
    <h2>Login</h2>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
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
