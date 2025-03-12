import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  // ✅ Admin Fetch all bookings
  getAllBookings() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ Admin Create a new booking
  createBooking(bookingData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      userId: bookingData.userId,
      vehicleId: bookingData.vehicleId,
      driverId: bookingData.driverId || null,
      destination: bookingData.destination,
      startDate: new Date(bookingData.startDate).getTime(),
      endDate: new Date(bookingData.endDate).getTime(),
      status: "PENDING",
    };

    return api.post("/bookings", formattedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ Admin Update a booking
  updateBooking(bookingId, bookingData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      userId: bookingData.userId,
      vehicleId: bookingData.vehicleId,
      driverId: bookingData.driverId || null,
      destination: bookingData.destination,
      startDate: new Date(bookingData.startDate).getTime(),
      endDate: new Date(bookingData.endDate).getTime(),
      status: bookingData.status,
    };

    return api.put(`/bookings/${bookingId}`, formattedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ Admin Delete a booking
  deleteBooking(bookingId) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ User Fetch bookings
  getUserBookings() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/bookings/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ User Create a new booking
  createUserBooking(bookingData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      destination: bookingData.destination,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      vehicleId: bookingData.vehicleId,
      driverId: bookingData.driverId,
      status: "PENDING",
    };

    return api.post("/bookings/user", formattedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // ✅ User cancel a booking
  cancelUserBooking(bookingId) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(
      `/bookings/${bookingId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ Ensure JSON content type is specified
        },
      }
    );
  },
};
