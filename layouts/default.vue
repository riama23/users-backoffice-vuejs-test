<template>
  <v-app>
    <v-navigation-drawer
      app
      class="bg-gradient"
      v-model="drawer"
      :absolute="isMobile"
      :temporary="isMobile"
      :permanent="!isMobile"
    >
      <v-list>
        <NuxtLink v-for="item in items" :to="item.href" :key="item.title">
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </NuxtLink>

        <v-list-item
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <ModalCreateUser>Add user</ModalCreateUser>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="pt-sm-16 pt-4">
        <div v-if="isMobile" class="my-4">Swipe right for the menu</div>
        <Nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js">
import ModalCreateUser from "~/components/modals/ModalCreateUser";
import {ApiUsers, IUser} from "~/repositories/Users";

export default {
  components: {
    'ModalCreateUser': ModalCreateUser,
  },
  async beforeMount() {
    const users = await ApiUsers.getAll();
    this.$store.commit('user/setList', users);
  },
  data() {
    const items = [
      {title: 'Users', icon: 'mdi-view-dashboard', href: '/users'},
    ];
    const drawer = true;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
      true : false;

    return {
      items,
      drawer,
      isMobile
    }
  },
}
</script>

<style lang='scss' scoped>
.v-main {
  background: url("/images/back.png");
  backdrop-filter: blur(3px);
  background-position-x: right;
}

a {
  display: flex;
  text-decoration: none;
}


.bg-gradient {
  background: linear-gradient(145deg, rgba(120,62,141,1) 55%, rgba(173,110,199,1) 100%);

  .v-list-item--link {
    color: white !important;

    &:hover {
      background: rgba(255,255,255,.3) !important;
      box-shadow: inset 0 -3px 0 0 #fff;
      transition: box-shadow ease-in 200ms, background ease-in 350ms;
    }

    .v-icon {
      color: white;
    }
  }
}
</style>
