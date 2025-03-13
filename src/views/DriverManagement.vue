<template>
  <div class="container mt-4">
    <h2>Driver Management</h2>

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
import { showSuccess, showError } from "@/utils/alert";
import Swal from "sweetalert2";

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
            showSuccess("Driver updated successfully!");
            this.isEditing = false;
            this.newDriver = {
              name: "",
              phone: "",
              licenseNo: "",
              status: "AVAILABLE",
            };
            this.fetchDrivers();
          })
          .catch((error) => {
            showError("Error updating driver!");
            console.error("Error updating driver:", error);
          });
      } else {
        driverService
          .createDriver(this.newDriver)
          .then(() => {
            showSuccess("Driver added successfully!");
            this.newDriver = {
              name: "",
              phone: "",
              licenseNo: "",
              status: "AVAILABLE",
            };
            this.fetchDrivers();
          })
          .catch((error) => {
            showError("Error adding driver!");
            console.error("Error adding driver:", error);
          });
      }
    },

    editDriver(driver) {
      this.isEditing = true;
      this.editingDriverId = driver.id;
      this.newDriver = { ...driver };
    },

    async deleteDriver(id) {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This driver will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmation.isConfirmed) {
        return; // Stop if user cancels
      }

      try {
        await driverService.deleteDriver(id);
        showSuccess("Driver deleted successfully!");
        this.fetchDrivers(); 
      } catch (error) {
        showError(error.response?.data?.error || "Failed to delete driver!");
      }
    },
  },
  async mounted() {
    await this.fetchDrivers();
  },
};
</script>
