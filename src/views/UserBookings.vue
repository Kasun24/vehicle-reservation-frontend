<template>
  <div class="container mt-4">
    <h2>My Bookings</h2>

    <!-- User Can Add a Booking -->
    <button @click="showBookingForm = true" class="btn btn-primary mb-3">
      New Booking
    </button>

    <!-- Booking Form (Hidden Until Clicked) -->
    <form v-if="showBookingForm" @submit.prevent="createBooking">
      <div class="mb-3">
        <label class="form-label">Vehicle</label>
        <select v-model="newBooking.vehicleId" class="form-control" required>
          <option disabled value="">Select a Vehicle</option>
          <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.brand }} - {{ vehicle.model }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Driver (Optional)</label>
        <select v-model="newBooking.driverId" class="form-control">
          <option value="">No Driver</option>
          <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
            {{ driver.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Destination</label>
        <input v-model="newBooking.destination" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Start Date</label>
        <input v-model="newBooking.startDate" type="date" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">End Date</label>
        <input v-model="newBooking.endDate" type="date" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-success">Submit Booking</button>
    </form>

    <!-- List User's Bookings -->
    <h3 class="mt-4">My Bookings</h3>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Vehicle</th>
          <th>Driver</th>
          <th>Destination</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in myBookings" :key="booking.id">
          <td>{{ booking.id }}</td>
          <td>{{ getVehicleName(booking.vehicleId) }}</td>
          <td>{{ getDriverName(booking.driverId) }}</td>
          <td>{{ booking.destination }}</td>
          <td>{{ booking.startDate }}</td>
          <td>{{ booking.endDate }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button v-if="booking.status === 'PENDING'" @click="cancelBooking(booking.id)" class="btn btn-danger btn-sm">
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bookingService from "@/services/bookingService";
import vehicleService from "@/services/vehicleService";
import driverService from "@/services/driverService";

export default {
  data() {
    return {
      myBookings: [],
      vehicles: [],
      drivers: [],
      newBooking: { vehicleId: "", driverId: "", destination: "", startDate: "", endDate: "" },
      showBookingForm: false,
    };
  },
  methods: {
    async fetchData() {
      try {
        const [bookingsRes, vehiclesRes, driversRes] = await Promise.all([
          bookingService.getUserBookings(),
          vehicleService.getAllVehicles(),
          driverService.getAllDrivers(),
        ]);
        this.myBookings = bookingsRes.data;
        this.vehicles = vehiclesRes.data;
        this.drivers = driversRes.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async createBooking() {
      try {
        await bookingService.createUserBooking(this.newBooking);
        alert("Booking created successfully!");
        this.newBooking = { vehicleId: "", driverId: "", destination: "", startDate: "", endDate: "" };
        this.showBookingForm = false;
        this.fetchData();
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    },

    async cancelBooking(bookingId) {
      if (!confirm("Are you sure you want to cancel this booking?")) return;

      try {
        await bookingService.cancelUserBooking(bookingId);
        alert("Booking cancelled successfully!");
        this.fetchData();
      } catch (error) {
        console.error("Error cancelling booking:", error);
      }
    },

    getVehicleName(vehicleId) {
      const vehicle = this.vehicles.find(v => v.id === vehicleId);
      return vehicle ? `${vehicle.brand} - ${vehicle.model}` : "Unknown";
    },

    getDriverName(driverId) {
      const driver = this.drivers.find(d => d.id === driverId);
      return driver ? driver.name : "No Driver";
    }
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
