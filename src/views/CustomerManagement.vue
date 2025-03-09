<template>
  <div class="container mt-4">
    <h2>Customer Management</h2>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

    <!-- Add / Edit Customer Form -->
    <form @submit.prevent="editingCustomer ? updateCustomer() : addCustomer()" class="mb-3">
      <input v-model="customer.name" type="text" class="form-control mb-2" placeholder="Name" required />
      <input v-model="customer.address" type="text" class="form-control mb-2" placeholder="Address" required />
      <input v-model="customer.telephone" type="text" class="form-control mb-2" placeholder="Telephone" required />
      <input v-model="customer.nic" type="text" class="form-control mb-2" placeholder="NIC" required />

      <button type="submit" class="btn btn-primary">
        {{ editingCustomer ? "Update Customer" : "Add Customer" }}
      </button>
      <button v-if="editingCustomer" @click="cancelEdit" class="btn btn-secondary ml-2">Cancel</button>
    </form>

    <!-- Customer List -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Telephone</th>
          <th>NIC</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.telephone }}</td>
          <td>{{ customer.nic }}</td>
          <td>
            <button @click="editCustomer(customer)" class="btn btn-warning btn-sm">Edit</button>
            <button @click="deleteCustomer(customer.id)" class="btn btn-danger btn-sm ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import customerService from "@/services/customerService";

export default {
  data() {
    return {
      customers: [],
      customer: { name: "", address: "", telephone: "", nic: "" },
      editingCustomer: null,
      errorMessage: "",
    };
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await customerService.getAllCustomers();
        this.customers = response.data;
      } catch (error) {
        this.errorMessage = "Failed to load customers.";
        console.error("Error fetching customers:", error);
      }
    },

    async addCustomer() {
      try {
        await customerService.addCustomer(this.customer);
        this.fetchCustomers();
        this.customer = { name: "", address: "", telephone: "", nic: "" };
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    },

    editCustomer(customer) {
      this.customer = { ...customer };
      this.editingCustomer = customer.id;
    },

    async updateCustomer() {
      try {
        await customerService.updateCustomer(this.editingCustomer, this.customer);
        this.fetchCustomers();
        this.cancelEdit();
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    },

    async deleteCustomer(customerId) {
      try {
        await customerService.deleteCustomer(customerId);
        this.fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    },

    cancelEdit() {
      this.customer = { name: "", address: "", telephone: "", nic: "" };
      this.editingCustomer = null;
    },
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>
