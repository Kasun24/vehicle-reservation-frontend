import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: !!localStorage.getItem("token"),
    userRole: localStorage.getItem("userRole") || "USER",
  }),
  actions: {
    login(token, role) {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      this.isAuthenticated = true;
      this.userRole = role;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      this.isAuthenticated = false;
      this.userRole = "USER";
    },
  },
});
