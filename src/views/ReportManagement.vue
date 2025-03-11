<template>
  <div class="container mt-4">
    <h2>Report Management</h2>

    <!-- Report Type Selection -->
    <div class="mb-3">
      <label class="form-label">Select Report Type</label>
      <select
        v-model="selectedReportType"
        class="form-control"
        @change="updateStatusOptions"
      >
        <option value="bookings">Booking Report</option>
        <option value="payments">Payment Report</option>
      </select>
    </div>

    <!-- Status Selection -->
    <div class="mb-3">
      <label class="form-label">Select Status</label>
      <select
        v-model="selectedStatus"
        class="form-control"
        :disabled="statusOptions.length === 0"
      >
        <option value="">All</option>
        <option v-for="status in statusOptions" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <!-- Date Filters -->
    <div class="mb-3">
      <label class="form-label">Start Date</label>
      <input v-model="startDate" type="date" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">End Date</label>
      <input v-model="endDate" type="date" class="form-control" />
    </div>

    <!-- Fetch Report Button -->
    <button @click="fetchReport" class="btn btn-primary">
      Generate Report
    </button>

    <!-- Export to CSV Button -->
    <button
      v-if="reportData.length"
      @click="exportToCSV"
      class="btn btn-success ms-2"
    >
      Export to CSV
    </button>

    <!-- Report Table -->
    <h3 class="mt-4">Report Data</h3>
    <table class="table" v-if="reportData.length">
      <thead>
        <tr>
          <th v-for="(key, index) in Object.keys(reportData[0])" :key="index">
            {{ formatHeader(key) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in reportData" :key="index">
          <td v-for="(value, key) in row" :key="key">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No records found.</p>
  </div>
</template>

<script>
import reportService from "@/services/reportService";

export default {
  data() {
    return {
      selectedReportType: "bookings", // Default to booking report
      selectedStatus: "", // Default to all
      startDate: "",
      endDate: "",
      reportData: [],
      statusOptions: ["PENDING", "CONFIRMED", "CANCELLED"], // Default booking statuses
    };
  },
  methods: {
    updateStatusOptions() {
      if (this.selectedReportType === "bookings") {
        this.statusOptions = ["PENDING", "CONFIRMED", "CANCELLED"];
      } else if (this.selectedReportType === "payments") {
        this.statusOptions = ["PENDING", "PAID", "CANCELLED"];
      }
      this.selectedStatus = ""; // Reset status when type changes
    },

    async fetchReport() {
      try {
        const params = {
          start_date: this.startDate || null,
          end_date: this.endDate || null,
          status: this.selectedStatus || null,
        };

        const response =
          this.selectedReportType === "bookings"
            ? await reportService.getBookingReport(params)
            : await reportService.getPaymentReport(params);

        this.reportData = response.data;
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    },

    formatHeader(header) {
      return header.replace(/_/g, " ").toUpperCase();
    },

    // ✅ Export report data to CSV
    exportToCSV() {
      if (!this.reportData.length) {
        alert("No report data available for export.");
        return;
      }

      let csvContent = "data:text/csv;charset=utf-8,";

      // Add headers
      const headers = Object.keys(this.reportData[0]).map((header) =>
        this.formatHeader(header)
      );
      csvContent += headers.join(",") + "\n";

      // Add rows
      this.reportData.forEach((row) => {
        const rowData = Object.values(row).map((value) =>
          typeof value === "string" ? `"${value}"` : value
        );
        csvContent += rowData.join(",") + "\n";
      });

      // Create and trigger CSV download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${this.selectedReportType}_report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    this.updateStatusOptions();
  },
};
</script>
