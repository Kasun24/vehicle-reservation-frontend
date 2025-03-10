<template>
  <div class="container mt-4">
    <h2>Admin Panel</h2>

    <div class="d-flex gap-2 mt-3">
      <router-link to="/customers" class="btn btn-primary"
        >Manage Customers</router-link
      >
      <router-link to="/vehicles" class="btn btn-primary"
        >Manage Vehicles</router-link
      >
      <router-link to="/drivers" class="btn btn-primary">
        Manage Drivers
      </router-link>
      <router-link to="/bookings" class="btn btn-primary"
        >Manage Bookings</router-link
      >
      <router-link to="/reports" class="btn btn-primary"
        >Generate Reports</router-link
      >
    </div>
  </div>
</template>
