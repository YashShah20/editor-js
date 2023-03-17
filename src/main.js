import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import VueRouter from "vue-router";
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
