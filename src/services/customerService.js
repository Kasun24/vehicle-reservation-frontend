import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  getAllCustomers() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/customers", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  addCustomer(customerData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.post("/customers", customerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateCustomer(customerId, customerData) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(`/customers/${customerId}`, customerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteCustomer(customerId) {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
