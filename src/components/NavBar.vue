<template>
  <div>
    <b-modal @close="closeModal" :width="400" :active.sync="isModalVisible">
      <LoginBox @close="closeModal" />
    </b-modal>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img style="min-height: 2em" alt="ShowCash" src="@/assets/logo.svg" />
        </b-navbar-item>
      </template>
      <template slot="start"></template>
      <template slot="end">
        <b-navbar-item v-if="primaryButtonText.length > 1" tag="div">
          <div class="buttons" @click="emitClick">
            <a class="button is-primary">
              <strong>{{ primaryButtonText }}</strong>
            </a>
          </div>
        </b-navbar-item>
        <b-navbar-item v-if="showUserMenu" tag="div">
          <b-upload v-model="file" @input="handleImage" :accept="formatAccepted">
            <a class="button is-primary">
              <strong>Upload Image</strong>
            </a>
          </b-upload>
          <p style="margin:0;padding-top:-10px;padding:0px;padding-left:4px;padding-right:4px;"></p>
          <b-dropdown aria-role="list">
            <figure class="is-rounded" slot="trigger">
              <img src="@/assets/avatar.png" height="100%" />
            </figure>
            <!-- <b-dropdown-item>Notifications</b-dropdown-item> -->
            <b-dropdown-item>
              <router-link
                :to="{ name: 'user', params: { username: this.userName } }"
                class="is-black"
                >My Profile</router-link
              >
            </b-dropdown-item>
            <b-dropdown-item>
              <a href="#" @click="logout" class="is-black">Logout</a>
            </b-dropdown-item>
          </b-dropdown>
        </b-navbar-item>
        <b-navbar-item v-else tag="div">
          <div class="buttons" @click="openModal">
            <a class="button is-primary">
              <strong>Login</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
      <br />
    </b-navbar>
  </div>
</template>

<script>
import LoginBox from '@/components/LoginBox.vue';
import { getLogout, uploadNewImage } from '@/lib/api';

import { toBase64 } from '@/lib/utils';
import EventBus from '@/events';

export default {
  components: {
    LoginBox,
  },
  props: {
    userProfile: {
      type: Object,
      default: null,
    },
    buttonText: {
      type: String,
    },
  },
  data() {
    return {
      user: this.userProfile,
      isModalVisible: false,

      // Image uploader
      file: null,
      imageData: '',
      formatAccepted: 'image/*',
    };
  },
  computed: {
    primaryButtonText() {
      return this.buttonText == null ? '' : this.buttonText;
    },
    showUserMenu() {
      return this.user != null;
    },
    userName() {
      return this.user.username;
    },
  },
  mounted() {
    EventBus.$on('logged-in', (data) => {
      this.user = data;
    });
    EventBus.$on('login-prompt', () => {
      this.openModal();
    });
    EventBus.$on('logged-out', () => {
      this.user = null;
    });
  },
  methods: {
    logout() {
      getLogout()
        .then(() => {
          EventBus.$emit('logged-out');
          this.$router.push({ path: '/' }).catch(() => {});
        })
        .catch(() => {});
    },
    emitClick() {
      this.$emit('nav-button');
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openModal() {
      this.isModalVisible = true;
    },
    handleImage() {
      return toBase64(this.file).then((result) => {
        const payload = {
          filename: this.file.name,
          file: result,
        };
        uploadNewImage(payload).then((response) => {
          this.$router.push({
            name: 'edit',
            params: {
              id: response.data.id,
            },
          });
        });
      });
    },
  },
};
</script>

<style lang="scss">
.navbar {
  padding-bottom: 0.6em;
}

a.is-black {
  color: black !important;
}
</style>
