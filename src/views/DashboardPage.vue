<template>
    <div class="container mt-4">
      <h2>Dashboard</h2>
      <!-- User Navigation -->
      <div class="mt-4">
        <h4>🔹 User Actions</h4>
        <ul class="list-group">
          <li class="list-group-item">
            <router-link to="/my-bookings">My Bookings</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/help">Help & Guidelines</router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/auth";
  
  export default {
    setup() {
      const authStore = useAuthStore();
      return { authStore };
    },
  };
  </script>
  
  <style scoped>
  .list-group-item {
    font-size: 18px;
  }
  </style>
  