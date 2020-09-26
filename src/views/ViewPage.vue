<template>
  <div class="container is-fluid">
    <NavBar :userProfile=user :buttonText=canEdit @nav-button="edit"  />
    <div class="columns">
      <div class="column is-two-thirds">
        <GalleryViewer
          :imageURI="imageURI"
          v-bind:date="date"
          v-bind:title="title"
          :by="by"
          :itemList="itemList"
          :selected="selectedID"
          :editable="false"
        />
        <!-- <AlbumSelector /> -->
      </div>
      <div class="column is-one-third sidebar">
        <br />
        <div v-if="itemList.length == 0">
          <p class="subtitle has-text-weight-semibold">
            ¯\_(ツ)_/¯ No tags
          </p>
        </div>

        <ItemCard
          v-else
          v-for="item in itemList"
          :title="item.title"
          :description="item.description"
          :link="item.link"
          :id="item.id"
          :key="item.id"
          :isHighlighted="item.id == selectedID"
        />
      </div>
    </div>
    <br />
    <div class="columns">
      <div class="column is-two-thirds">
        <h2 class="subtitle is-5">Comments</h2>
        <Comments :comments="comments" />
        <br />
        <CommentBox @submit="newComment" />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import GalleryViewer from '@/components/GalleryViewer.vue';
import ItemCard from '@/components/ItemCard.vue';
import CommentBox from '@/components/CommentBox.vue';
import Comments from '@/components/Comments.vue';
import EventBus from '@/events';

import { postView, postComment, getCommentsForPost } from '@/lib/api';

// import AlbumSelector from '@/components/AlbumSelector.vue';

export default {
  props: {
    showcash: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
    },
    appIdentifier: {
      type: String,
      required: false,
    },
  },
  components: {
    CommentBox,
    Comments,
    GalleryViewer,
    ItemCard,
    NavBar,
  },
  computed: {
    canEdit() {
      if (this.user) {
        return this.showcash.username === this.user.username ? 'Edit Post' : '';
      }
      return '?';
    },
  },
  data() {
    return {
      comments: [],
      imageURI: this.showcash.imageuri,
      selectedID: 0,
      // eslint-disable-next-line no-nested-ternary
      itemList: this.showcash.itemList,
      title: this.showcash.title,
      date: this.showcash.date,
      by: this.showcash.username,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    EventBus.$on('card-selected', (data) => {
      this.newSelection(data);
    });
    EventBus.$on('new-item', (data) => {
      this.newItem(data);
      this.newSelection(data.id);
    });
    EventBus.$on('show-cash', (data) => {
      this.newSelection(data);
    });
    this.scheduleView();
    this.fetchComments();

    EventBus.$on('logged-in', (data) => {
      this.user = data;
    });
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'edit',
        params: {
          id: this.$route.params.id,
        },
      });
    },
    fetchComments() {
      getCommentsForPost(this.$route.params.id).then((result) => {
        this.comments = result.data || [];
      });
    },
    scheduleView() {
      const payload = {
        id: this.$route.params.id,
        identifier: this.appIdentifier,
      };
      this.timer = setTimeout(() => {
        postView(payload);
      }, 2500);
    },
    goHome() {
      this.$router.push({ path: '/' }).catch(() => {});
    },
    newSelection(clickedID) {
      this.selectedID = clickedID;
    },
    newItem(item) {
      this.itemList.push(item);
    },
    newComment(item) {
      const payload = {
        comment: item.comment,
      };
      postComment(this.$route.params.id, payload).then((result) => {
        this.comments.push(result.data);
      }).catch(() => {
        EventBus.$emit('login-prompt');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  max-height: 80vh;
  overflow: auto;
}
</style>
