<template>
  <div class="body">
    <form @submit.prevent="submitComment" class="form-wrapper">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            v-model.trim="comment"
            placeholder="Something to add?..."
          ></textarea>
        </div>
      </div>

      <input
        type="submit"
        class="button is-fullwidth is-primary"
        value="Post Comment"
        :disabled="isDisabled"
      />
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comment: '',
    };
  },
  computed: {
    isDisabled() {
      return this.comment.length < 1;
    },
  },
  methods: {
    submitComment() {
      const payload = {
        comment: this.comment,
      };
      this.$emit('submit', payload);
      this.comment = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  outline: none !important;
  border: none !important;
}
textarea {
  outline: none !important;
  border: none !important;
  -webkit-box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
}
</style>
