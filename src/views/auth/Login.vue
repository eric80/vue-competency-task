<template>
  <div class="form" v-bind:class="{'error-form': loginFail}">
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <text-field
            v-model="username"
            placeholder="username"
            class="mb-2"
            :rules="usernameRules"
            ref="usernameField"
          ></text-field>

          <text-field
            :type="'password'"
            v-model="password"
            placeholder="password"
            class="mb-2"
            :rules="passwordRules"
            ref="passwordField"
          ></text-field>
          <div class="signin">
            <button class="submit-btn">LOG IN</button>
          </div>
          <v-flex xs6 offset-xs3 class="footer">
            <router-link to="/forgot-password" class="link">forgot password</router-link>
          </v-flex>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TextField from '../../components/TextField'

export default {
  name: 'Login',

  components: {
    TextField
  },

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
