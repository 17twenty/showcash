<template>
  <div class="hello">
    <b-button type="is-primary" outlined @click="handleClick">Click Me</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      // this.$emit('link-clicked');
      this.$buefy.notification.open('Clicked!!');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
