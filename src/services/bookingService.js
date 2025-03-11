import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  getAllBookings() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createBooking(bookingData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      customerId: bookingData.customerId,
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

  updateBooking(bookingId, bookingData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      customerId: bookingData.customerId,
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

  deleteBooking(bookingId) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
