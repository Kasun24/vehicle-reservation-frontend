<template>
  <div class="container mt-4">
    <h2>My Profile</h2>

    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="user.name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Address</label>
        <input
          v-model="user.address"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input v-model="user.phone" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">NIC</label>
        <input v-model="user.nic" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>
  </div>
</template>

<script>
import userService from "@/services/userService";
import { showError, showSuccess } from "@/utils/alert";

export default {
  data() {
    return {
      user: {
        name: "",
        address: "",
        phone: "",
        nic: "",
      },
    };
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await userService.getUserProfile();
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
        showError("Failed to fetch profile.", error);
      }
    },

    async updateProfile() {
      try {
        await userService.updateUserProfile(this.user);
        showSuccess("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        showError(error.response?.data?.error || "Failed to update profile!");
      }
    },
  },
  mounted() {
    this.fetchProfile();
  },
};
</script>
