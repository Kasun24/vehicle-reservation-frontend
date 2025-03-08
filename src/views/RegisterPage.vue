<template>
  <div class="container">
    <h2>Register</h2>
    <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
import api from "@/services/api.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await api.post("/auth/register", {
          username: this.username,
          password: this.password,
        });

        this.successMessage = "Registration successful! You can now login.";
        this.errorMessage = "";
        this.username = "";
        this.password = "";

        // Redirect to login after a short delay
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Registration failed!";
        this.successMessage = "";
      }
    },
  },
};
</script>
