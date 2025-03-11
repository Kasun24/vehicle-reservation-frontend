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

  createDriver(driverData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      name: driverData.name,
      phone: driverData.phone,
      licenseNo: driverData.licenseNo,
      status: driverData.status,
    };

    return api.post("/drivers", formattedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateDriver(driverId, driverData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    const formattedData = {
      name: driverData.name,
      phone: driverData.phone,
      licenseNo: driverData.licenseNo,
      status: driverData.status,
    };

    return api.put(`/drivers/${driverId}`, formattedData, {
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
