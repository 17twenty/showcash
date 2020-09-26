<template>
  <nav class="album-holder level is-mobile">
    <div
      @click="clicked(item.id)"
      style="level-item has-text-centered"
      v-for="item in items"
      :key="item.id"
    >
      <figure class="image is-96x96">
        <img :src="item.image"
         :style="itemStyle(item.id)" />
      </figure>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      items: [
        {
          id: 10,
          image: 'https://via.placeholder.com/640x480?text=10',
        },
        {
          id: 20,
          image: 'https://via.placeholder.com/640x480?text=20',
        },
        {
          id: 30,
          image: 'https://via.placeholder.com/640x480?text=30',
        },
        {
          id: 40,
          image: 'https://via.placeholder.com/640x480?text=40',
        },
        {
          id: 50,
          image: 'https://via.placeholder.com/640x480?text=50',
        },
      ],
    };
  },
  methods: {
    itemStyle(idx) {
      const style = {
        opacity: 0.5,
      };

      if ((this.selected === idx)) {
        style.opacity = '1';
      }
      return style;
    },
    // eslint-disable-next-line no-unused-vars
    clicked(id) {
      this.selected = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.album-holder {
  padding-top: 16px;
  width: 80%;
  margin: auto;
}
figure {
    padding-left: 4px;
    padding-right: 4px;
}
img:hover {
    opacity: 1 !important;
}
</style>
