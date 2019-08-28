import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import InstantSearch from "vue-instantsearch";
import VueClipboard from "vue-clipboard2";
import Toasted from "vue-toasted";

Vue.use(Toasted);
Vue.use(VueClipboard);
Vue.use(InstantSearch);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
