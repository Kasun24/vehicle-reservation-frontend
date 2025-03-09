import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  getAllDrivers() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/drivers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addDriver(driverData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.post("/drivers", driverData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateDriver(driverId, driverData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(`/drivers/${driverId}`, driverData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteDriver(driverId) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/drivers/${driverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
