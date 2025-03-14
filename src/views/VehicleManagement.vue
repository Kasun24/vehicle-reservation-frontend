<template>
  <div class="container">
    <h2>Vehicle Management</h2>

    <!-- Add / Edit Vehicle Form -->
    <form
      @submit.prevent="editedVehicle ? updateVehicle() : addVehicle()"
      class="mb-3"
    >
      <input
        v-model="newVehicle.model"
        type="text"
        placeholder="Model"
        class="form-control mb-2"
        required
      />
      <input
        v-model="newVehicle.brand"
        type="text"
        placeholder="Brand"
        class="form-control mb-2"
        required
      />
      <input
        v-model="newVehicle.year"
        type="number"
        placeholder="Year"
        class="form-control mb-2"
        required
      />
      <button type="submit" class="btn btn-primary">
        {{ editedVehicle ? "Update" : "Add" }} Vehicle
      </button>
    </form>

    <!-- Vehicle List -->
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Model</th>
          <th>Brand</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.id">
          <td>{{ vehicle.id }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.year }}</td>
          <td>
            <button
              @click="editVehicle(vehicle)"
              class="btn btn-warning btn-sm"
            >
              Edit
            </button>
            <button
              @click="deleteVehicle(vehicle.id)"
              class="btn btn-danger btn-sm ms-1"
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
import vehicleService from "@/services/vehicleService";
import { showError, showSuccess } from "@/utils/alert";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      vehicles: [],
      newVehicle: { model: "", brand: "", year: "" },
      editedVehicle: null,
    };
  },
  methods: {
    async fetchVehicles() {
      try {
        const response = await vehicleService.getAllVehicles();
        this.vehicles = response.data;
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    },
    async addVehicle() {
      try {
        await vehicleService.addVehicle(this.newVehicle);
        this.newVehicle = { model: "", brand: "", year: "" };
        showSuccess("Vehicle added successfully!");
        this.fetchVehicles();
      } catch (error) {
        console.error("Error adding vehicle:", error);
        showError("Failed to add vehicle.", error);
      }
    },
    editVehicle(vehicle) {
      this.editedVehicle = vehicle.id;
      this.newVehicle = { ...vehicle };
    },
    async updateVehicle() {
      try {
        await vehicleService.updateVehicle(this.editedVehicle, this.newVehicle);
        this.editedVehicle = null;
        this.newVehicle = { model: "", brand: "", year: "" };
        showSuccess("Vehicle updated successfully!");
        this.fetchVehicles();
      } catch (error) {
        console.error("Error updating vehicle:", error);
        showError("Failed to update vehicle.", error);
      }
    },
    async deleteVehicle(vehicleId) {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This vehicle will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmation.isConfirmed) return; // Stop if user cancels

      try {
        await vehicleService.deleteVehicle(vehicleId);
        showSuccess("Vehicle deleted successfully!");
        await this.fetchVehicles(); // Refresh vehicle list
      } catch (error) {
        showError(error.response?.data?.error || "Failed to delete vehicle!");
      }
    },
  },
  mounted() {
    this.fetchVehicles();
  },
};
</script>
