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
        <label class="form-label">Destination</label>
        <input
          v-model="newBooking.destination"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Start Date</label>
        <input
          v-model="newBooking.startDate"
          type="date"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">End Date</label>
        <input
          v-model="newBooking.endDate"
          type="date"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success">Submit Booking</button>
    </form>

    <!-- List User's Bookings -->
    <h3 class="mt-4">My Bookings</h3>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
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
          <td>{{ booking.destination }}</td>
          <td>{{ booking.startDate }}</td>
          <td>{{ booking.endDate }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button
              v-if="booking.status === 'PENDING'"
              @click="cancelBooking(booking.id)"
              class="btn btn-danger btn-sm"
            >
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

export default {
  data() {
    return {
      myBookings: [],
      newBooking: { destination: "", startDate: "", endDate: "" },
      showBookingForm: false,
    };
  },
  methods: {
    async fetchMyBookings() {
      try {
        const response = await bookingService.getUserBookings();
        this.myBookings = response.data;
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    },

    async createBooking() {
      try {
        await bookingService.createBooking(this.newBooking);
        alert("Booking created successfully!");
        this.newBooking = { destination: "", startDate: "", endDate: "" };
        this.showBookingForm = false;
        this.fetchMyBookings();
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    },

    async cancelBooking(bookingId) {
      if (!confirm("Are you sure you want to cancel this booking?")) return;

      try {
        await bookingService.cancelBooking(bookingId);
        alert("Booking cancelled successfully!");
        this.fetchMyBookings();
      } catch (error) {
        console.error("Error cancelling booking:", error);
      }
    },
  },
  mounted() {
    this.fetchMyBookings();
  },
};
</script>
