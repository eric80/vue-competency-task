<template>
  <h1>Hi {{user.firstName}}, Welcome!!! Your role is {{user.role}}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Admin',

  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  }
}
</script>
