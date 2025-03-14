<template>
  <div class="container mt-4">
    <h2>Payment Management</h2>

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
              class="btn btn-success btn-sm ms-1"
            >
              Mark as Paid
            </button>
            <button
              @click="updatePaymentStatus(payment.id, 'CANCELLED')"
              class="btn btn-danger btn-sm ms-1"
            >
              Cancel Payment
            </button>
            <button
              @click="deletePayment(payment.id)"
              class="btn btn-danger btn-sm ms-1"
            >
              Delete
            </button>

            <!-- Print Bill Button (Visible Only for PAID Payments) -->
            <button
              v-if="payment.status === 'PAID'"
              @click="printBill(payment)"
              class="btn btn-secondary btn-sm ms-1"
            >
              Print Bill
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Hidden Bill Template (To Print) -->
    <div id="bill-template" style="display: none">
      <h2>Vehicle Reservation System - Payment Receipt</h2>
      <p><strong>Booking Number:</strong> {{ selectedBill.bookingNumber }}</p>
      <p><strong>Amount:</strong> ${{ selectedBill.amount }}</p>
      <p><strong>Tax:</strong> ${{ selectedBill.tax }}</p>
      <p><strong>Discount:</strong> ${{ selectedBill.discount }}</p>
      <p><strong>Total Amount:</strong> ${{ selectedBill.totalAmount }}</p>
      <p><strong>Status:</strong> {{ selectedBill.status }}</p>
      <hr />
      <p><em>Thank you for your payment!</em></p>
    </div>
  </div>
</template>

<script>
import paymentService from "@/services/paymentService";
import bookingService from "@/services/bookingService";
import { showError, showSuccess } from "@/utils/alert";
import Swal from "sweetalert2";

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
      selectedBill: {}, // Store selected payment for printing
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
          showSuccess("Payment updated successfully!");
        } else {
          await paymentService.createPayment(this.newPayment);
          showSuccess("Payment added successfully!");
        }
        this.isEditing = false;
        this.resetForm();
        this.fetchData();
      } catch (error) {
        console.error("Error submitting payment:", error);
        showError("Error submitting payment.", error);
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
        showSuccess("Payment details updated successfully!");
        await this.fetchData(); // Refresh list
      } catch (error) {
        console.error("Error updating payment details:", error);
        showError("Error updating payment details.", error);
      }
    },

    async updatePaymentStatus(paymentId, status) {
      try {
        await paymentService.updatePaymentStatus(paymentId, status);
        showSuccess(`Payment status updated to ${status}!`);
        await this.fetchData();
      } catch (error) {
        console.error("Error updating payment status:", error);
        showError("Error updating payment status.", error);
      }
    },

    async deletePayment(id) {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This payment will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirmation.isConfirmed) return;

      try {
        await paymentService.deletePayment(id);
        showSuccess("Payment deleted successfully!");
        await this.fetchData(); // Refresh payment list
      } catch (error) {
        showError(error.response?.data?.error || "Failed to delete payment!");
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

    // ✅ Print Bill Function
    printBill(payment) {
      this.selectedBill = {
        bookingNumber: this.getBookingNumber(payment.bookingId),
        amount: payment.amount.toFixed(2),
        tax: payment.tax.toFixed(2),
        discount: payment.discount.toFixed(2),
        totalAmount: payment.totalAmount.toFixed(2),
        status: payment.status,
      };

      this.$nextTick(() => {
        const billContent = document.getElementById("bill-template").innerHTML;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(
          "<html><head><title>Print Bill</title></head><body>"
        );
        printWindow.document.write(billContent);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      });
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
