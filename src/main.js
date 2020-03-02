import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTimes,
  faMinus,
  faSignOutAlt,
  faGripLines,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCrosshairs,
  faArrowsAltV,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import createStore from './store';
import createRouter from './router';
import wb from "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.prototype.$workbox = wb;

// Add fontawesome icons and initialize component
library.add(
  faPlus,
  faTimes,
  faMinus,
  faSignOutAlt,
  faGripLines,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCrosshairs,
  faArrowsAltV,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const store = createStore();
const router = createRouter();

// Start App
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
