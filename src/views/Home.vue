<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      left
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="cyan" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Hi {{user.firstName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div @click="logout" class="logout">
        <i class="fa fa-sign-out"></i> Log Out
      </div>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout justify-center align-center xs12>
          <v-flex text-xs-center>
            <v-data-table
              :headers="headers"
              :items="desserts"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.username }}</td>
                <td>{{ props.item.gender }}</td>
                <td>{{ props.item.test }}</td>
                <td>{{ props.item.status }}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Admin',

  data: () => ({
    drawer: null,
    headers: [
      {
        text: 'ID',
        align: 'center',
        value: 'id'
      },
      {
        text: 'User Name',
        value: 'username',
        align: 'center'
      },
      {
        text: 'Gender',
        value: 'gender',
        align: 'center'
      },
      {
        text: 'Test',
        value: 'test',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'status',
        align: 'center'
      }
    ],
    desserts: [
      {
        username: 'Endrit Kane',
        id: 1,
        gender: 'M',
        test: 'GM',
        status: 'Active'
      },
      {
        username: 'Maria Garcia',
        id: 2,
        gender: 'W',
        test: 'GM',
        status: 'Pending'
      },
      {
        username: 'James Smith',
        id: 3,
        gender: 'M',
        test: 'GM',
        status: 'Disable'
      },
      {
        username: 'Maria Hernandez',
        id: 4,
        gender: 'W',
        test: 'GM',
        status: 'Pending'
      },
      {
        username: 'Delois Ohlson',
        id: 5,
        gender: 'W',
        test: 'GM',
        status: 'Pending'
      },
      {
        username: 'Cherry Zahm',
        id: 6,
        gender: 'W',
        test: 'GM',
        status: 'Pending'
      },
      {
        username: 'Toshia Monterroso',
        id: 7,
        gender: 'W',
        test: 'GM',
        status: 'Pending'
      },
      {
        username: 'Aron Delamater',
        id: 8,
        gender: 'M',
        test: 'GM',
        status: 'Disable'
      },
      {
        username: 'Claude Grajales',
        id: 9,
        gender: 'M',
        test: 'GM',
        status: 'Active'
      },
      {
        username: 'Leon Paff',
        id: 10,
        gender: 'M',
        test: 'GM',
        status: 'Pending'
      }
    ]
  }),

  props: {
    source: String
  },

  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .logout {
    cursor: pointer;
  }
</style>
