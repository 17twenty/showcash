<template>
  <div class="container is-fluid">
    <NavBar :userProfile="user" />
    <section class="hero has-bg-img parent">
      <div class="box child">
        <div class="container">
          <div class="columns">
            <div class="column is-one-fifth">
              <div class="has-text-centered">
                <figure class="image container">
                  <img class="is-rounded" src="@/assets/avatar.png" />
                </figure>
                <br />
                <p class="has-text-weight-semibold">@{{ viewedUser.username }}</p>
                <p class="has-text-grey-light">{{ viewedUser.location }}</p>
              </div>
            </div>
            <div class="column is-four-fifths">
              <p>
                <strong>About {{ viewedUser.realname }}:</strong>
              </p>
              <p>{{ viewedUser.bio }}</p>
              <br />
              <p>Member since {{ viewedUser.created_at | formatDate }}</p>
            </div>
            <div class="column is-one-fifth">
              <!-- <p>120 Views</p>
              <p>7 Uploads</p>
              <p>12412 Comments</p>
              <p>2 Followers</p> -->
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div v-if="mostrecent.length > 0" class="column">
            <h1 class="title is-5">From the top. . .</h1>
            <div class="columns is-multiline is-mobile">
              <div
                v-for="post in mostrecent"
                :key="post.id"
                class="column is-full-mobile is-half-tablet
        is-one-quarter-desktop is-one-quarter-widescreen
        is-one-quarter-fullhd"
              >
                <PreviewCard
                  :image="post.imageuri"
                  :title="post.title"
                  :date="post.date"
                  :id="post.id"
                  :by="post.username"
                />
              </div>
            </div>
          </div>
          <div v-else class="column">
            <h2 class="title is-5">Nothing to show</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import PreviewCard from '@/components/PreviewCard.vue';
import { getUsersMostRecent } from '@/lib/api';

export default {
  props: {
    user: {
      type: Object,
    },
    viewedUser: {
      type: Object,
      required: true,
    },
  },
  components: {
    NavBar,
    PreviewCard,
  },
  computed: {},
  data() {
    return {
      mostrecent: [],
    };
  },
  mounted() {
    getUsersMostRecent(this.viewedUser.user_id).then(({ data }) => {
      // eslint-disable-next-line no-param-reassign
      this.mostrecent = data || [];
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.has-bg-img {
  background: url('/grad.svg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.box {
  /* Generated via https://www.cssmatic.com/box-shadow */
  -webkit-box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
}
.hero {
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.7);
  min-height: 60vh;
  margin-bottom: 10vh;
}
.parent {
  position: relative;
}
.child {
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 60px;
  position: absolute;
  top: 100px;
  left: 16%;
  right: 16%;
}
</style>
