<template>
  <div class="form text-md-center" v-bind:class="{'error-form': loginFail}">
    <div>
      <h1 class="text-sm-left">Log In</h1>
      <p
        v-if="loginStatus.error"
        class="text-md-left error mt-3"
      >
        {{loginStatus.message}}
      </p>
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <v-text-field
            v-model="username"
            label="Email"
            required
            :rules="usernameRules"
            ref="usernameField"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            v-model="password"
            :rules="passwordRules"
            ref="passwordField"
          ></v-text-field>
          <div class="mt-3">
            <v-btn type="submit" large class="submit">LOG IN</v-btn>
          </div>
          <v-flex xs6 class="footer mt-3">
            <router-link to="/forgot-password" class="link">Forgot Password</router-link>
          </v-flex>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Login',

  data () {
    return {
      username: null,
      password: null,
      loginFail: false,
      usernameRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => /\S{8,}/igm.test(v) || 'At least 8 characters'
      ]
    }
  },

  computed: {
    ...mapGetters({
      loginStatus: 'auth/loginStatus'
    })
  },

  methods: {
    handleSubmit: function () {
      const isEmailValid = this.$refs.usernameField.validate(this.username)
      const isPasswordValid = this.$refs.passwordField.validate(this.password)

      if (isEmailValid && isPasswordValid) {
        const loginInfo = {
          'username': this.username.toLowerCase(),
          'password': this.password
        }
        this.$store.dispatch('auth/login', loginInfo)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .form {
    max-width: 500px;
    margin: 0 auto;

    .error {
      color: red;
      font-size: 1.5rem;
    }

    .submit {
      display: block;
      margin-left: 0;
      margin-right: auto;
      background-color: #2096f3 !important;
      color: white;
    }

    .footer {
      text-align: left;

      a {
        color: black;
        text-decoration: none;
      }
    }
  }
</style>
