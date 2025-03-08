<template>
  <div>
    <MainNavbar />
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar.vue";

export default {
  components: { MainNavbar },
};
</script>
