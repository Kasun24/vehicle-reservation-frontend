<template>
  <div class="container mt-4">
    <h2>User Management</h2>

    <!-- Add / Edit User Form -->
    <form @submit.prevent="editingUser ? updateUser() : addUser()" class="mb-3">
      <input
        v-model="user.username"
        type="text"
        class="form-control mb-2"
        placeholder="Username"
        required
      />
      <input
        v-if="!editingUser"
        v-model="user.password"
        type="password"
        class="form-control mb-2"
        placeholder="Password"
        required
      />
      <input
        v-model="user.name"
        type="text"
        class="form-control mb-2"
        placeholder="Name"
        required
      />
      <input
        v-model="user.address"
        type="text"
        class="form-control mb-2"
        placeholder="Address"
        required
      />
      <input
        v-model="user.phone"
        type="text"
        class="form-control mb-2"
        placeholder="Phone"
        required
      />
      <input
        v-model="user.nic"
        type="text"
        class="form-control mb-2"
        placeholder="NIC"
        required
      />

      <!-- Role Selection -->
      <select v-model="user.role" class="form-control mb-2" required>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button type="submit" class="btn btn-primary">
        {{ editingUser ? "Update User" : "Add User" }}
      </button>
      <button
        v-if="editingUser"
        @click="cancelEdit"
        class="btn btn-secondary ml-2"
      >
        Cancel
      </button>
    </form>

    <!-- User List -->
    <h3 class="mt-4">Existing Users</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>NIC</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.nic }}</td>
          <td>
            <select
              v-model="user.role"
              @change="updateUserRole(user.username, user.role)"
              class="form-control form-control-sm"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </td>
          <td>
            <button @click="editUser(user)" class="btn btn-warning btn-sm">
              Edit
            </button>
            <button
              @click="deleteUser(user.username)"
              class="btn btn-danger btn-sm ml-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userService from "@/services/userService";
import { showSuccess, showError } from "@/utils/alert";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      users: [],
      user: {
        username: "",
        password: "",
        name: "",
        address: "",
        phone: "",
        nic: "",
        role: "USER",
      },
      editingUser: null,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await userService.getAllUsers();
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async addUser() {
      try {
        await userService.addUser(this.user);
        showSuccess("User added successfully!");
        this.fetchUsers();
        this.resetForm();
      } catch (error) {
        showError(error.response?.data?.error || "Failed to add user!");
      }
    },

    editUser(user) {
      this.user = { ...user };
      this.editingUser = user.username;
    },

    async updateUser() {
      try {
        await userService.updateUser(this.editingUser, this.user);
        showSuccess("User updated successfully!");
        this.fetchUsers();
        this.cancelEdit();
      } catch (error) {
        showError(error.response?.data?.error || "Failed to update user!");
      }
    },

    async updateUserRole(username, role) {
      try {
        await userService.updateUserRole(username, role);
        showSuccess("User role updated successfully!");
        this.fetchUsers();
      } catch (error) {
        showError(error.response?.data?.error || "Failed to update user role!");
      }
    },

    async deleteUser(username) {
      if (
        !(
          await Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
          })
        ).isConfirmed
      ) {
        return;
      }

      try {
        await userService.deleteUser(username);
        showSuccess("User deleted successfully!");
        this.fetchUsers();
      } catch (error) {
        showError(error.response?.data?.error || "Failed to delete user!");
      }
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.user = {
        username: "",
        password: "",
        name: "",
        address: "",
        phone: "",
        nic: "",
        role: "USER",
      };
      this.editingUser = null;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
