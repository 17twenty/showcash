<template>
  <div class="clickable" @mouseover="hover = true" @mouseleave="hover = false" @click="viewPost()">
    <figure class="image is-4by3">
      <img
        src="https://image.freepik.com/free-photo/shades-blue-random-circle-tile-seamless-pattern-watercolor-illustration_98599-299.jpg"
        class="desaturate"
        alt="Loading..."
      />
    </figure>
    <p class="centered is-size-3 has-text-weight-semibold">{{ getTitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTitle() {
      if (this.tag) {
        return this.tag
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      return '';
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
  position: relative;
  text-align: center;
  color: white;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.desaturate {
  -webkit-filter: grayscale(50%) brightness(60%) contrast(120%);
  filter: grayscale(50%) brightness(60%) contrast(120%);
}
</style>
