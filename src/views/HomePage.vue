<template>
  <div class="container mt-4">
    <h1 class="text-center">Welcome to Vehicle Reservation System</h1>

    <div v-if="loading" class="text-center mt-3">
      <p>Loading vehicles...</p>
    </div>

    <div v-else-if="error" class="text-danger text-center mt-3">
      <p>{{ error }}</p>
    </div>

    <div v-else>
      <h2 class="mt-4">Available Vehicles</h2>
      <div class="row">
        <div v-for="vehicle in vehicles" :key="vehicle.id" class="col-md-4">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ vehicle.brand }} - {{ vehicle.model }}</h5>
              <p class="card-text">Year: {{ vehicle.year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.js"; // Import the API service

export default {
  data() {
    return {
      vehicles: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchVehicles();
  },
  methods: {
    async fetchVehicles() {
      try {
        const response = await api.get("/vehicles"); // Fetch vehicle data
        this.vehicles = response.data; // Store in array
      } catch (err) {
        this.error = "Failed to load vehicles. Please try again.";
        console.error(err);
      } finally {
        this.loading = false; // Stop loading
      }
    },
  },
};
</script>
