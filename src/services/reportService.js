import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  getBookingReport(params) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/reports/bookings", {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getPaymentReport(params) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/reports/payments", {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
