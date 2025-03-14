<template>
  <div class="container mt-4">
    <h2>Booking Management</h2>

    <!-- Booking Form -->
    <form @submit.prevent="submitBooking">
      <div class="mb-3">
        <label class="form-label">User</label>
        <select v-model="newBooking.userId" class="form-control" required>
          <option disabled value="">Select a User</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name || user.username }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Vehicle</label>
        <select v-model="newBooking.vehicleId" class="form-control" required>
          <option disabled value="">Select a Vehicle</option>
          <option
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            :value="vehicle.id"
          >
            {{ vehicle.brand }} - {{ vehicle.model }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Driver</label>
        <select v-model="newBooking.driverId" class="form-control">
          <option disabled value="">Select a Driver</option>
          <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
            {{ driver.name }}
          </option>
        </select>
      </div>

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

      <!-- ✅ Status Selection (Only in Edit Mode) -->
      <div class="mb-3" v-if="isEditing">
        <label class="form-label">Status</label>
        <select v-model="newBooking.status" class="form-control">
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEditing ? "Update Booking" : "Add Booking" }}
      </button>
    </form>

    <!-- Booking List -->
    <h3 class="mt-4">Existing Bookings</h3>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Booking Number</th>
          <th>User</th>
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
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ booking.id }}</td>
          <td>{{ booking.bookingNumber }}</td>
          <td>{{ getUserName(booking.userId) }}</td>
          <td>{{ getVehicleName(booking.vehicleId) }}</td>
          <td>{{ getDriverName(booking.driverId) }}</td>
          <td>{{ booking.destination }}</td>
          <td>{{ formatDate(booking.startDate) }}</td>
          <td>{{ formatDate(booking.endDate) }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button
              @click="editBooking(booking)"
              class="btn btn-warning btn-sm"
            >
              Edit
            </button>
            <button
              @click="deleteBooking(booking.id)"
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
import bookingService from "@/services/bookingService";
import userService from "@/services/userService";
import vehicleService from "@/services/vehicleService";
import driverService from "@/services/driverService";
import { showSuccess, showError } from "@/utils/alert";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      bookings: [],
      users: [],
      vehicles: [],
      drivers: [],
      newBooking: {
        userId: "",
        vehicleId: "",
        driverId: "",
        destination: "",
        startDate: "",
        endDate: "",
        status: "PENDING",
      },
      isEditing: false,
      editingBookingId: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        const [bookingsRes, usersRes, vehiclesRes, driversRes] =
          await Promise.all([
            bookingService.getAllBookings(),
            userService.getAllUsers(),
            vehicleService.getAllVehicles(),
            driverService.getAllDrivers(),
          ]);

        this.bookings = bookingsRes.data;
        this.users = usersRes.data;
        this.vehicles = vehiclesRes.data;
        this.drivers = driversRes.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async submitBooking() {
      try {
        const formattedBooking = {
          userId: this.newBooking.userId,
          vehicleId: this.newBooking.vehicleId,
          driverId: this.newBooking.driverId || null,
          destination: this.newBooking.destination,
          startDate: new Date(this.newBooking.startDate).getTime(),
          endDate: new Date(this.newBooking.endDate).getTime(),
          status: this.newBooking.status || "PENDING",
        };

        if (this.isEditing) {
          await bookingService.updateBooking(
            this.editingBookingId,
            formattedBooking
          );
          showSuccess("Booking updated successfully!");
        } else {
          await bookingService.createBooking(formattedBooking);
          showSuccess("Booking added successfully!");
        }

        this.resetBooking();
        await this.fetchData();
      } catch (error) {
        console.error("Error saving booking:", error);
        showError("Error saving booking.", error);
      }
    },

    editBooking(booking) {
      this.isEditing = true;
      this.editingBookingId = booking.id;
      this.newBooking = {
        userId: booking.userId,
        vehicleId: booking.vehicleId,
        driverId: booking.driverId || "",
        destination: booking.destination,
        startDate: this.convertTimestampToDate(booking.startDate),
        endDate: this.convertTimestampToDate(booking.endDate),
        status: booking.status,
      };
    },

    async deleteBooking(id) {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This booking will be permanently deleted!",
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
        await bookingService.deleteBooking(id);
        showSuccess("Booking deleted successfully!");
        this.fetchData(); // Refresh booking list
      } catch (error) {
        showError(error.response?.data?.error || "Failed to delete booking!");
      }
    },

    getUserName(userId) {
      return this.users.find((c) => c.id === userId)?.name || "Unknown";
    },

    getVehicleName(vehicleId) {
      const vehicle = this.vehicles.find((v) => v.id === vehicleId);
      return vehicle ? `${vehicle.brand} - ${vehicle.model}` : "Unknown";
    },

    getDriverName(driverId) {
      return this.drivers.find((d) => d.id === driverId)?.name || "No Driver";
    },

    formatDate(timestamp) {
      return timestamp ? new Date(timestamp).toLocaleDateString() : "N/A";
    },

    convertTimestampToDate(timestamp) {
      return timestamp ? new Date(timestamp).toISOString().split("T")[0] : "";
    },

    resetBooking() {
      this.newBooking = {
        userId: "",
        vehicleId: "",
        driverId: "",
        destination: "",
        startDate: "",
        endDate: "",
        status: "PENDING",
      };
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
