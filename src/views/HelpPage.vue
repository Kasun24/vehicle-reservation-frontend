<template>
  <div class="container mt-4">
    <h2 class="mb-4">System Usage Guidelines</h2>

    <div class="accordion" id="helpAccordion">
      <!-- Authentication Help -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#authHelp"
          >
            🔑 Authentication & Login
          </button>
        </h2>
        <div id="authHelp" class="accordion-collapse collapse show">
          <div class="accordion-body">
            - Login using your **username and password**.<br />
            - Admins have access to **all management sections**.<br />
            - Users can only view **their own bookings**.
          </div>
        </div>
      </div>

      <!-- Customer Management Help -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#customerHelp"
          >
            👤 Customer Management
          </button>
        </h2>
        <div id="customerHelp" class="accordion-collapse collapse">
          <div class="accordion-body">
            - **Add new customers** with registration details.<br />
            - **Update customer info** if necessary.<br />
            - **Delete customers** (only if they have no active bookings).
          </div>
        </div>
      </div>

      <!-- Booking Management Help -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bookingHelp"
          >
            📅 Booking Management
          </button>
        </h2>
        <div id="bookingHelp" class="accordion-collapse collapse">
          <div class="accordion-body">
            - Select a **customer, vehicle, and destination**.<br />
            - Assign a **driver** (optional).<br />
            - **Booking status** updates automatically based on changes.<br />
            - **Cancel a booking** if necessary.
          </div>
        </div>
      </div>

      <!-- Payment Management Help -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#paymentHelp"
          >
            💳 Payment Management
          </button>
        </h2>
        <div id="paymentHelp" class="accordion-collapse collapse">
          <div class="accordion-body">
            - Enter the **amount, tax, and discount**.<br />
            - Click **"Mark as Paid"** when the payment is received.<br />
            - Payments can be **cancelled if necessary**.
          </div>
        </div>
      </div>

      <!-- Reports Help -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#reportsHelp"
          >
            📊 Reports & Analytics
          </button>
        </h2>
        <div id="reportsHelp" class="accordion-collapse collapse">
          <div class="accordion-body">
            - View **Booking Reports** (based on date & status).<br />
            - View **Payment Reports** (based on date & status).<br />
            - Select filters to generate reports dynamically.
          </div>
        </div>
      </div>

      <!-- General Help -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#generalHelp"
          >
            ℹ️ General Information
          </button>
        </h2>
        <div id="generalHelp" class="accordion-collapse collapse">
          <div class="accordion-body">
            - Ensure all required fields are **properly filled**.<br />
            - Use the **search bar** to quickly find records.<br />
            - If you encounter an error, refresh the page or log in again.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
};
</script>

<style>
.accordion-button {
  font-weight: bold;
}
</style>
