/* eslint-disable max-len */
<template>
  <div class="gallery_holder">
    <b-modal @close="closeModal" :width="400" :active.sync="isModalVisible">
      <div class="box">
        <form @submit.prevent="showIt">
          <b-field label="What is it?">
            <b-input required v-model.trim="itemTitle" :value="itemTitle"> </b-input>
          </b-field>
          <b-field label="What do you want to say about it?">
            <b-input required v-model.trim="itemDescription" :value="itemDescription"> </b-input>
          </b-field>
          <b-field label="Where can I get it (referral link)?">
            <b-input
              placeholder="https://www.showcash.com"
              v-model.trim="itemLink"
              :value="itemLink"
            >
            </b-input>
          </b-field>
          <input
            type="submit"
            class="button is-fullwidth is-primary"
            value="Show it"
            :disabled="isDisabled"
          />
        </form>
      </div>
    </b-modal>
    <div class="header">
      <section v-if="editable">
        <b-input
          required
          type="is-success"
          v-model="newTitle"
          @blur="changeTitle"
          placeholder="Post title / What you showing off?"></b-input>
      </section>
      <section v-else>
      <h3>
        <strong>{{ title }}</strong>
      </h3>
      <small>{{ date | formatDate }} by <router-link
                :to="{ name: 'user', params: { username: by } }"
                class="is-black is-link"
                >{{ by }}</router-link></small>
      </section>
    </div>
    <!-- @mousemove="getCoords" -->
    <img
      class="main"
      :class="{ 'is-droppable': editable }"
      @click="clickLocation"
      :src="imageURI"
    />
    <HoverObject
      v-for="item in itemList"
      :left="item.left"
      :top="item.top"
      :title="item.title"
      :description="item.description"
      :link="item.link"
      :id="item.id"
      :key="item.id"
    />
  </div>
</template>

<script>
import EventBus from '@/events';
import HoverObject from '@/components/HoverObject.vue';

export default {
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
    imageURI: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    by: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    itemList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isDisabled() {
      return !(this.itemTitle.length > 1) && this.itemDescription.length > 1;
    },
  },
  components: { HoverObject },
  data() {
    return {
      isModalVisible: false,
      newTitle: this.title,
      currentID: this.itemList.length,
      itemTitle: '',
      itemDescription: '',
      itemLink: '',
    };
  },
  methods: {
    changeTitle() {
      this.$emit('update-title', this.newTitle);
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showIt() {
      if (!this.editable) {
        return;
      }

      const newItem = {
        id: (this.currentID += 1),
        title: this.itemTitle,
        description: this.itemDescription,
        link: this.itemLink,
        left: Math.round(this.currentX),
        top: Math.round(this.currentY),
      };
      EventBus.$emit('new-item', newItem);

      this.itemTitle = '';
      this.itemDescription = '';
      this.itemLink = '';
      this.currentX = null;
      this.currentY = null;

      this.isModalVisible = false;
    },
    // eslint-disable-next-line no-unused-vars
    clickLocation(event) {
      if (!this.editable) {
        return;
      }
      this.isModalVisible = true;
      const rect = event.target.getBoundingClientRect();
      this.currentX = ((event.clientX - 12 - rect.left)
       / event.target.parentElement.offsetWidth) * 100;
      this.currentY = ((event.clientY + 20 - rect.top)
       / event.target.parentElement.offsetHeight) * 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery_holder {
  position: relative;
  padding: 0;
  margin: 0;

  /* Generated via https://www.cssmatic.com/box-shadow */
  -webkit-box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
}

.gallery_holder .main {
  position: relative;
  margin: 0;
  padding: 0;
  min-width: 100%;
  object-fit: fill;
  display: block;
}

.is-droppable {
  cursor: crosshair;
}

.header {
  text-align: left;
  padding: 8px;
  line-height: 1em;
  background-color: #3ef980;
  font-weight: 400;
}
</style>
