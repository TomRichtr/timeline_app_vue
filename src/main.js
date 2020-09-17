import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./scss/styles.scss";
import "normalize.css/normalize.css";
import { BootstrapVue } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRandomColor from "vue-randomcolor";

library.add(faCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRandomColor);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
