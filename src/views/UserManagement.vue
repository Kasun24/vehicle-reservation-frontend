<template>
  <div class="container mt-4">
    <h2>User Management</h2>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

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
      errorMessage: "",
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await userService.getAllUsers();
        this.users = response.data;
      } catch (error) {
        this.errorMessage = "Failed to load users.";
        console.error("Error fetching users:", error);
      }
    },

    async addUser() {
      try {
        await userService.addUser(this.user);
        this.fetchUsers();
        this.resetForm();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },

    editUser(user) {
      this.user = { ...user };
      this.editingUser = user.username;
    },

    async updateUser() {
      try {
        await userService.updateUser(this.editingUser, this.user);
        this.fetchUsers();
        this.cancelEdit();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },

    async updateUserRole(username, role) {
      try {
        await userService.updateUserRole(username, role);
        this.fetchUsers();
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    },

    async deleteUser(username) {
      if (!confirm("Are you sure you want to delete this user permanently?")) {
        return;
      }

      try {
        await userService.deleteUser(username);
        this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
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
