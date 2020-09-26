<template>
  <div class="container is-fluid">
    <NavBar :userProfile="user" />

    <VueFullScreenFileDrop @drop="onDrop" />

    <section class="hero has-bg-img">
      <div class="hero-body parent">
        <div class="container">
          <div class="column is-half">
            <h1 class="title">Browse the latest styles and <!--get paid to-->show off your own</h1>
            <h2 class="subtitle">Signup or drop an image to get started</h2>
          </div>
        </div>
        <img class="child splash-card is-hidden-mobile" src="/demo.png" />
      </div>
    </section>
    <br />
    <template v-if="mostviewed.length > 0">
      <h1 class="title is-5">Most Viewed</h1>
      <hr style="padding-top: -0.8em;margin-top: -0.8em" />
      <div class="columns is-multiline is-mobile">
        <div
          v-for="post in mostviewed"
          :key="post.id"
          class="column is-half-mobile is-half-tablet
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
      <br />
    </template>
    <h1 class="title is-5">The Latest</h1>
    <hr style="padding-top: -0.8em;margin-top: -0.8em" />
    <div class="columns is-multiline is-mobile">
      <div
        v-for="post in mostrecent"
        :key="post.id"
        class="column is-half-mobile is-half-tablet
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
    <br />
    <h1 class="title is-5">Browse By Tag</h1>
    <hr style="padding-top: -0.8em;margin-top: -0.8em" />
    <div class="columns  is-mobile is-multiline">
      <div
        class="column is-half-mobile is-half-tablet
        is-one-quarter-desktop is-one-quarter-widescreen
        is-one-quarter-fullhd"
      >
        <BlurCard tag="sneakers" />
      </div>
      <div
        class="column is-half-mobile is-half-tablet
        is-one-quarter-desktop is-one-quarter-widescreen
        is-one-quarter-fullhd"
      >
        <BlurCard tag="menswear" />
      </div>
      <div
        class="column is-half-mobile is-half-tablet
        is-one-quarter-desktop is-one-quarter-widescreen
        is-one-quarter-fullhd"
      >
        <BlurCard tag="tinyhomes" />
      </div>
      <div
        class="column is-half-mobile is-half-tablet
        is-one-quarter-desktop is-one-quarter-widescreen
        is-one-quarter-fullhd"
      >
        <BlurCard tag="doggo" />
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p><strong>ShowCash</strong> is made with ❤️ in Sydney, Australia.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import VueFullScreenFileDrop from 'vue-full-screen-file-drop';
import NavBar from '@/components/NavBar.vue';
import PreviewCard from '@/components/PreviewCard.vue';
import BlurCard from '@/components/BlurCard.vue';
import 'vue-full-screen-file-drop/dist/vue-full-screen-file-drop.css';
import { toBase64 } from '@/lib/utils';
import { uploadNewImage } from '@/lib/api';
import EventBus from '@/events';

export default {
  components: {
    VueFullScreenFileDrop,
    NavBar,
    PreviewCard,
    BlurCard,
  },
  props: {
    user: {
      type: Object,
    },
    mostviewed: {
      type: Array,
      required: true,
    },
    mostrecent: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    handleUpdateFile(file) {
      return toBase64(file).then((result) => {
        const payload = {
          filename: file.name,
          file: result,
        };
        this.closeModal();
        uploadNewImage(payload).then((response) => {
          this.$router.push({
            name: 'edit',
            params: {
              id: response.data.id,
            },
          });
        });
      });
    },
    onDrop(formData, files) {
      return toBase64(files[0]).then((result) => {
        const payload = {
          filename: files[0].name,
          file: result,
        };
        uploadNewImage(payload)
          .then((response) => {
            this.$router.push({
              name: 'edit',
              params: {
                id: response.data.id,
              },
            });
          })
          .catch(() => {
            EventBus.$emit('login-prompt');
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.7);
  min-height: 40vh;
  margin-bottom: 10vh;
}
.hero-body {
  min-width: 80%;
  max-width: 80%;

  margin-left: auto;
  margin-right: auto;
}
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
.splash-card {
  max-width: 360px;
  max-height: 50vh;
}
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 20px;
  left: auto;
  right: 10%;
}
</style>
