import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home';
import FindFalcone from '../components/FindFalcone';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/find-falcone',
    component: FindFalcone,
    name: 'find-falcone'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
