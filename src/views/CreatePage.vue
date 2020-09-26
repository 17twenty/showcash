<template>
  <div class="container is-fluid">
    <NavBar buttonText='Save' @nav-button="publish" :userProfile=user />

    <div class="columns">
      <div class="column is-three-quarters">
        <GalleryViewer
          @update-title="updateTitle"
          :imageURI="imageURI"
          v-bind:date="date"
          :title="title"
          :itemList="itemList"
          :selected="selectedID"
          :editable=true
        />
        <!-- <AlbumSelector /> -->
      </div>
      <div class="column is-one-quarter sidebar">
        <br />
        <div v-if="itemList.length == 0">
          <p class="subtitle has-text-weight-semibold">
            <span style='font-size:60px;'>&#128072;</span>
          <br> Give it a title, give it some tags</p>
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
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import GalleryViewer from '@/components/GalleryViewer.vue';
import ItemCard from '@/components/ItemCard.vue';
import EventBus from '@/events';
import { updatePost } from '@/lib/api';

export default {
  props: {
    showcash: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
    },
  },
  components: {
    GalleryViewer,
    ItemCard,
    NavBar,
  },
  data() {
    return {
      imageURI: this.showcash.imageuri,
      selectedID: 0,
      // eslint-disable-next-line no-nested-ternary
      itemList: this.showcash.itemList,
      title: this.showcash.title,
      date: this.showcash.date,
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
  },
  methods: {
    updateTitle(title) {
      this.title = title;
    },
    publish() {
      const payload = {
        id: this.$route.params.id,
        title: (this.title.length < 1) ? 'My Random Showcash' : this.title,
        imageuri: this.imageURI,
        itemList: this.itemList,
      };

      updatePost(this.$route.params.id, payload).then(() => {
        this.$router.push({
          name: 'view',
          params: {
            id: this.$route.params.id,
          },
        });
      });
    },
    newSelection(clickedID) {
      this.selectedID = clickedID;
    },
    newItem(item) {
      this.itemList.push(item);
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
