import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  getAllVehicles() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/vehicles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addVehicle(vehicleData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.post("/vehicles", vehicleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateVehicle(vehicleId, vehicleData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(`/vehicles/${vehicleId}`, vehicleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteVehicle(vehicleId) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/vehicles/${vehicleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
