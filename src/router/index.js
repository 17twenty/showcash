import Vue from 'vue';
import Nprogress from 'nprogress';
import VueRouter from 'vue-router';
import { uuid } from 'vue-uuid'; // Import uuid
import {
  getUserData, getOtherData, getPost, getMostRecent, getMostViewed,
} from '@/lib/api';

Vue.use(VueRouter);

const appIdentifier = uuid.v4();

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "HomePage" */ '@/views/HomePage.vue'),
    props: true,
    beforeEnter(to, from, next) {
      return Promise.allSettled([
        getUserData().then(({ data }) => {
          // eslint-disable-next-line no-param-reassign
          to.params.user = data;
        }).catch(() => {
        }),
        getMostRecent().then(({ data }) => {
          // eslint-disable-next-line no-param-reassign
          to.params.mostrecent = data || [];
        }),
        getMostViewed().then(({ data }) => {
          // eslint-disable-next-line no-param-reassign
          to.params.mostviewed = data || [];
        }),
      ]).then(() => {
        next();
      });
    },
  },
  {
    path: '/u/:username',
    name: 'user',
    component: () => import(/* webpackChunkName: "ProfileView" */ '@/views/ProfileView.vue'),
    props: true,
    beforeEnter(to, from, next) {
      getUserData().then(({ data }) => {
        // eslint-disable-next-line no-param-reassign
        to.params.user = data;
      });
      return getOtherData(to.params.username).then(({ data }) => {
        // eslint-disable-next-line no-param-reassign
        to.params.viewedUser = data;
        next();
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        next({ name: 'home' });
      });
    },
  },
  // {
  //   path: '/t/:tag',
  //   name: 'tag',
  //   component: () => import(/* webpackChunkName: "TagView" */ '@/views/TagView.vue'),
  //   props: true,
  //   beforeEnter(to, from, next) {
  //     return getByTags(to.params.tag).then(({ data }) => {
  //       // eslint-disable-next-line no-param-reassign
  //       to.params.tags = data.tags || [];
  //       next();
  //     });
  //   },
  // },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "CreatePage" */ '@/views/CreatePage.vue'),
    props: true,
    beforeEnter(to, from, next) {
      getUserData().then(({ data }) => {
        // eslint-disable-next-line no-param-reassign
        to.params.user = data;
      });
      return getPost(to.params.id)
        .then(({ data }) => {
          // eslint-disable-next-line no-param-reassign
          to.params.showcash = data;
          // eslint-disable-next-line no-param-reassign
          to.params.showcash.itemList = data.itemList || [];
          next();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          next({ name: 'home' });
        });
    },
  },
  {
    path: '/v/:id',
    name: 'view',
    component: () => import(/* webpackChunkName: "ViewPage" */ '@/views/ViewPage.vue'),
    props: true,
    beforeEnter(to, from, next) {
      getUserData().then(({ data }) => {
        // eslint-disable-next-line no-param-reassign
        to.params.user = data;
      }).catch(() => {
      });
      return getPost(to.params.id)
        .then(({ data }) => {
          // eslint-disable-next-line no-param-reassign
          to.params.appIdentifier = appIdentifier;
          // eslint-disable-next-line no-param-reassign
          to.params.showcash = data;
          // eslint-disable-next-line no-param-reassign
          to.params.showcash.itemList = data.itemList || [];
          next();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          next({ name: 'home' });
        });
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];


const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});
router.afterEach(() => {
  Nprogress.done();
});

export default router;
