import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || null);
  const userRole = ref(localStorage.getItem("userRole") || "USER");

  const isAuthenticated = computed(() => !!token.value);

  function login(newToken, role) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userRole", role);
    token.value = newToken;
    userRole.value = role;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    token.value = null;
    userRole.value = "USER";

    // Force reload to reflect state change instantly
    window.location.href = "/login";
  }

  return { token, userRole, isAuthenticated, login, logout };
});
