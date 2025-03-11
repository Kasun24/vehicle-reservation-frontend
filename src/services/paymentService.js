import api from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  // ✅ Get all payments
  getAllPayments() {
    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get("/payments", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Get payment by Booking ID
  getPaymentByBookingId(bookingId) {
    if (!bookingId) {
      console.error("Error: Booking ID is required for fetching payment.");
      return Promise.reject("Booking ID is required");
    }

    const authStore = useAuthStore();
    const token = authStore.token;

    return api.get(`/payments/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Create a new payment with proper validation
  createPayment(paymentData) {
    if (!paymentData.bookingId || !paymentData.amount) {
      console.error("Error: Missing required fields for creating payment.");
      return Promise.reject("Booking ID and Amount are required");
    }

    const authStore = useAuthStore();
    const token = authStore.token;

    // Ensure all numeric values are parsed correctly
    const amount = parseFloat(paymentData.amount) || 0;
    const tax = parseFloat(paymentData.tax) || 0;
    const discount = parseFloat(paymentData.discount) || 0;
    const totalAmount = amount + tax - discount;

    const formattedData = {
      bookingId: paymentData.bookingId,
      amount: amount,
      tax: tax,
      discount: discount,
      totalAmount: totalAmount,
    };

    return api.post("/payments", formattedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ✅ Update payment details (amount, tax, discount, total)
  updatePaymentDetails(paymentId, paymentData) {
    if (!paymentId) {
      console.error("Error: Payment ID is missing in updatePaymentDetails!");
      return Promise.reject("Payment ID is missing");
    }

    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(`/payments/${paymentId}`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure JSON is correctly sent
      },
    });
  },

  // ✅ Update payment status (PAID or CANCELLED)
  updatePaymentStatus(paymentId, status) {
    if (!paymentId) {
      console.error(
        "Error: Booking ID is required for updating payment status."
      );
      return Promise.reject("Booking ID is required");
    }

    if (status !== "PAID" && status !== "CANCELLED") {
      console.error("Error: Invalid payment status provided.");
      return Promise.reject("Invalid status. Allowed: PAID, CANCELLED");
    }

    const authStore = useAuthStore();
    const token = authStore.token;

    return api.put(
      `/payments/${paymentId}/status/${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  // ✅ Delete a payment
  deletePayment(paymentId) {
    if (!paymentId) {
      console.error("Error: Payment ID is required for deletion.");
      return Promise.reject("Payment ID is required");
    }

    const authStore = useAuthStore();
    const token = authStore.token;

    return api.delete(`/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
