import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
