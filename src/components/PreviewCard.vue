<template>
  <div class="card">
    <div
      class="card-image clickable"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click="viewPost()"
    >
      <figure class="image is-4by3">
        <img :src="image" :class="{ popout: hover }" alt="Loading..." />
      </figure>
    </div>
    <div class="card-header-title">{{ getTitle.slice(0, 60) }}</div>
    <div class=" card-content">
      <div class="content">
        <p class="is-hidden-mobile">
          by
          <router-link :to="{ name: 'user', params: { username: by } }" class="is-black is-link">{{
            by
          }}</router-link>
          <br />
          {{ date | formatDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    by: {
      type: String,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    getTitle() {
      return this.title.length > 0 ? this.title : 'Untitled Masterpiece';
    },
  },
  methods: {
    viewPost() {
      this.$router.push({
        name: 'view',
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
}

.popout {
  transition: all 0.2s ease-in-out;
}
.popout:hover {
  transform: scale(1.1);
}
p {
  font-size: 80%;
}

.blurry {
  filter: blur(1px);
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
  -o-filter: blur(1px);
  -ms-filter: blur(1px);
}
</style>
