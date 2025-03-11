<template>
  <div class="container mt-4">
    <h2>Payment Management</h2>

    <!-- Success / Error Messages -->
    <p v-if="message" class="alert alert-info">{{ message }}</p>

    <!-- Payment Form -->
    <form @submit.prevent="submitPayment">
      <div class="mb-3">
        <label class="form-label">Booking</label>
        <select v-model="newPayment.bookingId" class="form-control" required>
          <option disabled value="">Select a Booking</option>
          <option
            v-for="booking in bookings"
            :key="booking.id"
            :value="booking.id"
          >
            {{ booking.bookingNumber }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Amount</label>
        <input
          v-model.number="newPayment.amount"
          type="number"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Tax</label>
        <input
          v-model.number="newPayment.tax"
          type="number"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Discount</label>
        <input
          v-model.number="newPayment.discount"
          type="number"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Total Amount</label>
        <input
          :value="calculateTotal()"
          type="number"
          class="form-control"
          readonly
        />
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEditing ? "Update Payment" : "Add Payment" }}
      </button>
    </form>

    <!-- Payment List -->
    <h3 class="mt-4">Existing Payments</h3>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Booking Number</th>
          <th>Amount</th>
          <th>Tax</th>
          <th>Discount</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.id }}</td>
          <td>{{ getBookingNumber(payment.bookingId) }}</td>
          <td>{{ payment.amount }}</td>
          <td>{{ payment.tax }}</td>
          <td>{{ payment.discount }}</td>
          <td>{{ payment.totalAmount }}</td>
          <td>{{ payment.status }}</td>
          <td>
            <button
              @click="editPayment(payment)"
              class="btn btn-warning btn-sm"
            >
              Edit
            </button>
            <button
              @click="updatePaymentStatus(payment.id, 'PAID')"
              class="btn btn-success btn-sm"
            >
              Mark as Paid
            </button>
            <button
              @click="updatePaymentStatus(payment.id, 'CANCELLED')"
              class="btn btn-danger btn-sm"
            >
              Cancel Payment
            </button>
            <button
              @click="deletePayment(payment.id)"
              class="btn btn-danger btn-sm"
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
import paymentService from "@/services/paymentService";
import bookingService from "@/services/bookingService";

export default {
  data() {
    return {
      payments: [],
      bookings: [],
      newPayment: {
        bookingId: "",
        amount: 0,
        tax: 0,
        discount: 0,
        totalAmount: 0,
      },
      isEditing: false,
      editingPaymentId: null,
      message: "",
    };
  },
  methods: {
    async fetchData() {
      try {
        const [paymentsRes, bookingsRes] = await Promise.all([
          paymentService.getAllPayments(),
          bookingService.getAllBookings(),
        ]);
        this.payments = paymentsRes.data;
        this.bookings = bookingsRes.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async submitPayment() {
      if (!this.newPayment.bookingId) {
        alert("Please select a booking!");
        return;
      }

      this.newPayment.totalAmount = this.calculateTotal(); // Ensure total updates before submission

      try {
        if (this.isEditing) {
          await paymentService.updatePaymentDetails(
            this.editingPaymentId,
            this.newPayment
          );
          this.message = "Payment updated successfully!";
        } else {
          await paymentService.createPayment(this.newPayment);
          this.message = "Payment added successfully!";
        }

        this.isEditing = false;
        this.resetForm();
        this.fetchData();
      } catch (error) {
        console.error("Error submitting payment:", error);
      }
    },

    editPayment(payment) {
      this.isEditing = true;
      this.editingPaymentId = payment.id;
      this.newPayment = { ...payment };
    },
    async updatePayment() {
      if (!this.selectedPayment || !this.selectedPayment.id) {
        console.error("Error: Payment ID is missing in updatePayment!");
        return;
      }

      try {
        await paymentService.updatePaymentDetails(
          this.selectedPayment.id,
          this.selectedPayment
        );
        this.message = "Payment details updated successfully!";
        await this.fetchData(); // Refresh list
      } catch (error) {
        console.error("Error updating payment details:", error);
      }
    },
    
    async updatePaymentStatus(paymentId, status) {
      if (!paymentId) {
        console.error("Error: Payment ID is missing in updatePaymentStatus!");
        return;
      }

      try {
        await paymentService.updatePaymentStatus(paymentId, status);
        this.message = `Payment status updated to ${status}!`;
        await this.fetchData();
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    },

    async deletePayment(id) {
      if (!confirm("Are you sure you want to delete this payment?")) return;

      try {
        await paymentService.deletePayment(id);
        this.message = "Payment deleted successfully!";
        await this.fetchData();
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    },

    getBookingNumber(bookingId) {
      const booking = this.bookings.find((b) => b.id === bookingId);
      return booking ? booking.bookingNumber : "Unknown";
    },

    calculateTotal() {
      const { amount, tax, discount } = this.newPayment;
      return (
        parseFloat(amount || 0) +
        parseFloat(tax || 0) -
        parseFloat(discount || 0)
      ).toFixed(2);
    },

    resetForm() {
      this.newPayment = {
        bookingId: "",
        amount: 0,
        tax: 0,
        discount: 0,
        totalAmount: 0,
      };
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
