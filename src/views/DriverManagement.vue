<template>
  <div class="container mt-4">
    <h2>Driver Management</h2>

    <!-- Success / Error Messages -->
    <p v-if="message" class="alert alert-info">{{ message }}</p>

    <!-- Driver Form -->
    <form @submit.prevent="submitDriver">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input
          v-model="newDriver.name"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input
          v-model="newDriver.phone"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">License No</label>
        <input
          v-model="newDriver.licenseNo"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Status</label>
        <select v-model="newDriver.status" class="form-control" required>
          <option value="AVAILABLE">Available</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEditing ? "Update Driver" : "Add Driver" }}
      </button>
    </form>

    <!-- Driver List -->
    <h3 class="mt-4">Existing Drivers</h3>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>License No</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="driver in drivers" :key="driver.id">
          <td>{{ driver.id }}</td>
          <td>{{ driver.name }}</td>
          <td>{{ driver.phone }}</td>
          <td>{{ driver.licenseNo }}</td>
          <td>{{ driver.status }}</td>
          <td>
            <button @click="editDriver(driver)" class="btn btn-warning btn-sm">
              Edit
            </button>
            <button
              @click="deleteDriver(driver.id)"
              class="btn btn-danger btn-sm"
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
import driverService from "@/services/driverService";

export default {
  data() {
    return {
      drivers: [],
      newDriver: {
        name: "",
        phone: "",
        licenseNo: "",
        status: "AVAILABLE", // Default status
      },
      isEditing: false,
      editingDriverId: null,
      message: "",
    };
  },
  methods: {
    async fetchDrivers() {
      try {
        const response = await driverService.getAllDrivers();
        this.drivers = response.data;
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    },

    submitDriver() {
      if (this.isEditing) {
        driverService
          .updateDriver(this.editingDriverId, this.newDriver)
          .then(() => {
            this.message = "Driver updated successfully!";
            this.isEditing = false;
            this.newDriver = {
              name: "",
              phone: "",
              licenseNo: "",
              status: "AVAILABLE",
            };
            this.fetchDrivers();
          })
          .catch((error) => console.error("Error updating driver:", error));
      } else {
        driverService
          .createDriver(this.newDriver)
          .then(() => {
            this.message = "Driver added successfully!";
            this.newDriver = {
              name: "",
              phone: "",
              licenseNo: "",
              status: "AVAILABLE",
            };
            this.fetchDrivers();
          })
          .catch((error) => console.error("Error adding driver:", error));
      }
    },

    editDriver(driver) {
      this.isEditing = true;
      this.editingDriverId = driver.id;
      this.newDriver = { ...driver };
    },

    async deleteDriver(id) {
      if (
        !confirm("Are you sure you want to delete this driver permanently?")
      ) {
        return; // Stops execution if the user cancels
      }

      try {
        await driverService.deleteDriver(id);
        this.message = "Driver deleted successfully!";
        await this.fetchDrivers(); // Refresh driver list
      } catch (error) {
        console.error("Error deleting driver:", error);
      }
    },
  },
  async mounted() {
    await this.fetchDrivers();
  },
};
</script>
