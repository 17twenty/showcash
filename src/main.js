import moment from 'moment';
import Vue from 'vue';
import Buefy from 'buefy';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import store from './store';
import router from './router';
import 'nprogress/nprogress.css';


Vue.filter('formatDate', (value) => {
  if (value) {
    const date = new Date(value);
    const timeUTC = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    return moment(timeUTC).fromNow();
  }
  return '';
});


router.beforeEach((to, from, next) => {
  const subdomain = window.location.host.split('.')[0];
  if (subdomain === 'www') {
    window.location.href = window.location.href.replace('www.showcash.io', 'showcash.io');
  }
  next();
});

Vue.use(VueGtag, {
  config: {
    id: 'UA-161572851-1',
    params: {
      send_page_view: true,
    },
  },
}, router);

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
