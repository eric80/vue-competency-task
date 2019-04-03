<template>
  <div class="form text-md-center" v-bind:class="{'error-form': loginFail}">
    <div>
      <h1 class="text-sm-left">Log In</h1>
      <form @submit.prevent="handleSubmit">
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
          <div>
            <v-btn large class="submit">LOG IN</v-btn>
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

export default {
  name: 'Login',

  data () {
    return {
      username: null,
      password: null,
      loginFail: false,
      usernameRules: [
        (v) => !!v || 'E-mail is required'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => /\S{8,}/igm.test(v) || 'At least 8 characters'
      ]
    }
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
