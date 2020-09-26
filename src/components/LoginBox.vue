<template>
  <div>
      <form @submit.prevent="login" class="box" v-if="showLogin" key="login">
        <h1 class="subtitle">Let's get you logged in</h1>
        <b-field
          label="Username"
          :type="{ 'is-danger': hasError }"
          :message="{ 'Nope, bad username or password': hasError }"
        >
          <b-input required v-model.trim="username" :value="username"> </b-input>
        </b-field>
        <b-field label="Password" :type="{ 'is-danger': hasError }">
          <b-input
            type="password"
            required
            v-model.trim="password"
            :value="password"
            password-reveal
          >
          </b-input>
        </b-field>
        <input
          type="submit"
          class="button is-fullwidth is-primary"
          value="Login"
          :disabled="isDisabled"
        />
        <br />
        <a @click="toggleLogin"><p>Want an account? Register now</p></a>
      </form>
      <form @submit.prevent="joinWaitlist" class="box" v-else key="waitlist">
        <h1 class="subtitle">Pool's closed at the moment</h1>
        <strong>Join Waitlist</strong>
        <b-field label="Email Address">
          <b-input type="email" required v-model.trim="waitListEmail" :value="waitListEmail">
          </b-input>
        </b-field>
        <b-field label="Username">
          <b-input type="text" required v-model.trim="waitListUsername" :value="waitListUsername">
          </b-input>
        </b-field>
        <b-field label="Your Name">
          <b-input type="text" required v-model.trim="waitListName" :value="waitListName">
          </b-input>
        </b-field>
        <input type="submit" class="button is-fullwidth is-primary" value="Join Waitlist" />
        <br />
        <a @click="toggleLogin"><p>Have an account? Login</p></a>
      </form>
    </div>
</template>

<script>
import { ToastProgrammatic as Toast } from 'buefy';
import { postLogin, postWaitlist } from '@/lib/api';
import EventBus from '@/events';

export default {
  components: {},
  props: {},
  data() {
    return {
      waitListUsername: '',
      waitListEmail: '',
      waitListName: '',
      showLogin: true,
      username: '',
      password: '',
      hasError: false,
    };
  },
  computed: {
    isDisabled() {
      return !(this.username.length > 1) && this.password.length > 1;
    },
  },
  methods: {
    toggleLogin() {
      this.showLogin = !this.showLogin;
    },
    joinWaitlist() {
      const payload = {
        username: this.waitListUsername,
        email_address: this.waitListEmail,
        realname: this.waitListName,
      };
      postWaitlist(payload)
        .finally(() => {
          Toast.open({
            message: `We'll be in touch ${payload.realname}`,
            type: 'is-danger',
            duration: 5000,
            position: 'is-bottom',
          });
          this.waitListUsername = '';
          this.waitListEmail = '';
          this.waitListName = '';
          this.$emit('close');
        });
    },
    recommend() {
      this.$emit('close');
    },
    login() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      postLogin(payload)
        .then((response) => {
          this.$emit('close');
          EventBus.$emit('logged-in', response.data);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          if (error.response.status === 403) {
            this.hasError = true;
          }
        });
    },
  },
};
</script>

<style></style>
