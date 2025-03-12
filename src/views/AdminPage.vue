<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">🔧 Admin Panel</h2>

    <div class="row">
      <!-- Manage Users -->
      <div class="col-md-4 mb-3">
        <router-link to="/users" class="card admin-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-users fa-3x text-primary mb-3"></i>
            <h5 class="card-title">Manage Users</h5>
            <p class="card-text">View, add, and modify users.</p>
          </div>
        </router-link>
      </div>

      <!-- Manage Vehicles -->
      <div class="col-md-4 mb-3">
        <router-link to="/vehicles" class="card admin-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-car fa-3x text-success mb-3"></i>
            <h5 class="card-title">Manage Vehicles</h5>
            <p class="card-text">Manage the vehicle inventory.</p>
          </div>
        </router-link>
      </div>

      <!-- Manage Drivers -->
      <div class="col-md-4 mb-3">
        <router-link to="/drivers" class="card admin-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-id-card fa-3x text-warning mb-3"></i>
            <h5 class="card-title">Manage Drivers</h5>
            <p class="card-text">Add or update driver details.</p>
          </div>
        </router-link>
      </div>

      <!-- Manage Bookings -->
      <div class="col-md-4 mb-3">
        <router-link to="/bookings" class="card admin-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-calendar-check fa-3x text-info mb-3"></i>
            <h5 class="card-title">Manage Bookings</h5>
            <p class="card-text">Review & update reservations.</p>
          </div>
        </router-link>
      </div>

      <!-- Manage Payments -->
      <div class="col-md-4 mb-3">
        <router-link to="/payments" class="card admin-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-money-bill-wave fa-3x text-danger mb-3"></i>
            <h5 class="card-title">Manage Payments</h5>
            <p class="card-text">Track & update payment records.</p>
          </div>
        </router-link>
      </div>

      <!-- Generate Reports -->
      <div class="col-md-4 mb-3">
        <router-link to="/reports" class="card admin-card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-chart-bar fa-3x text-secondary mb-3"></i>
            <h5 class="card-title">Generate Reports</h5>
            <p class="card-text">View booking & payment reports.</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-card {
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
}

.admin-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
