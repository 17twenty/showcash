<template>
    <img class="clickable" @click="clicked" v-bind:src="image"
     :class="{'bounce animated': animated}" @animationend="animated = false"
     v-bind:style="hoverObject" />
</template>

<script>

import Marker from '@/assets/marker.svg';
import ShadowMarker from '@/assets/marker-shadow.svg';
import EventBus from '@/events';


export default {
  props: {
    left: {
      type: Number,
    },
    top: {
      type: Number,
    },
    title: {
      type: String,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    clicked() {
      const clickedID = this.id;
      EventBus.$emit('show-cash', clickedID);
    },
    animate() {
      this.animated = true;
    },
  },
  mounted() {
    EventBus.$on('card-selected', (data) => {
      if (data === this.id) {
        this.animate();
      }
    });
  },
  computed: {
    image() {
      return this.isShadow ? Marker : ShadowMarker;
    },
  },
  data() {
    return {
      isShadow: false,
      animated: true,
      hoverObject: {
        height: '40px',
        position: 'absolute',
        left: `${Math.round(this.left)}%`,
        top: `${Math.round(this.top)}%`,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.clickable {
    cursor: pointer;
}
</style>
