import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  getAllUsers() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addUser(userData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.post("/users", userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateUser(username, userData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(`/users/${username}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateUserRole(username, role) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(
      "/users/update-role",
      { username, role }, // ✅ Send as JSON body, not query params
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ Explicitly set content type
        },
      }
    );
  },

  // ✅ Fetch user profile
  getUserProfile() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Update user profile
  updateUserProfile(profileData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put("/users/profile", profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteUser(username) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
