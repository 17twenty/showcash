<template>
  <div>
    <article v-for="c in comments"
      :key="c.id"
       class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="@/assets/profile.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong><router-link
                :to="{ name: 'user', params: { username: c.username } }"
                class="is-black is-link"
                >{{ c.username }}</router-link></strong>
            <br />
                {{ c.comment }}
            <br />
            <small>Posted {{ c.date | formatDate }}</small>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
