<template>
  <div class="container mt-4">
    <!-- Hero Section -->
    <div class="jumbotron text-center bg-dark text-white p-5 rounded">
      <h1 class="display-5">🚗 Welcome to the Vehicle Reservation System</h1>
      <p class="lead">
        Browse our fleet of high-quality vehicles and book with ease!
      </p>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>Fetching available vehicles...</p>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="alert alert-danger text-center mt-4">
      {{ error }}
    </div>

    <!-- Vehicle List -->
    <div v-else>
      <h2 class="mt-4 text-center">🚘 Available Vehicles</h2>

      <div class="row mt-3">
        <div v-for="vehicle in vehicles" :key="vehicle.id" class="col-md-4 mb-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">
                {{ vehicle.brand }} - {{ vehicle.model }}
              </h5>
              <p class="card-text">
                <strong>🚀 Year:</strong> {{ vehicle.year }}<br />
              </p>
              <router-link to="/my-bookings" class="btn btn-outline-primary w-100">
                Book Now
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-5 text-center">
        <h3>Why Choose Our Service?</h3>
        <p class="lead">
          ✅ Wide range of vehicles | 🚗 Easy booking process | 💰 Affordable rates
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.js"; // Import API service

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
