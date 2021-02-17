import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/pages/Home.vue';
import Play from '../components/pages/Play.vue';
import Victory from '../components/pages/Victory.vue';


Vue.use(VueRouter);

export default function createRouter() {
  const routes = [
    { path: '', name: 'home', component: Home },
    { path: '/play/:mode', name: 'play', component: Play },
    { path: '/victory', name: 'victory', component: Victory },
  ];

  return new VueRouter({
    routes,
    mode: 'history',
  });
}
