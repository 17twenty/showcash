<template>
  <div class="itemCard" @click="clicked" v-bind:class="{ highlight: isHighlighted }">
    <div class="content">
      <p class="subtitle has-text-weight-semibold">{{ title }}</p>

      <p v-if="!readMoreActivated">{{ description.slice(0, 80) }}...</p>
      <a class="has-text-grey-darker" v-if="!readMoreActivated" @click="activateReadMore" href="#">
        <strong>More...</strong>
      </a>
      <p v-if="readMoreActivated" v-html="description"></p>
      <div class="columns">
        <div class="column is-half is-offset-half">
          <button
            v-if="link.length > 0"
            @click="openLink"
            class="button is-primary is-inverted is-fullwidth is-outlined"
          >
            Get this
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/events';

export default {
  props: {
    isHighlighted: {
      type: Boolean,
    },
    id: {
      type: Number,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      readMoreActivated: this.description.length < 80,
    };
  },
  methods: {
    activateReadMore() {
      this.readMoreActivated = true;
    },
    openLink() {
      const schemaLink = this.link.indexOf('://') === -1 ? `http://${this.link}` : this.link;
      window.open(schemaLink, '_blank');
    },
    clicked() {
      EventBus.$emit('card-selected', this.id);
    },
  },
};
</script>

<style style="scss" scoped>
.itemCard {
  max-width: 200px;
  min-width: 100%;
  word-wrap: break-word;
}
.highlight {
  background: #3ef980;
}
.content {
  margin: 0.5rem;
  padding: 0.1rem 0.1rem 0.5rem 0.1rem;
}
</style>
