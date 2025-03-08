import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// ✅ Import Bootstrap styles
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
