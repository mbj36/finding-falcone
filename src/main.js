import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import Axios from 'axios';
import router from './router/index'; // importing router

Vue.use(Vuetify);

import 'vuetify/dist/vuetify.min.css'; // This is required to use vuetify CSS

Vue.config.productionTip = false;

Vue.prototype.$http = Axios; //Registering the Axios globally to use like this.$http

Vue.prototype.$http.defaults.baseURL = 'https://findfalcone.herokuapp.com';

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
