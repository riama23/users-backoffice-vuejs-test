<template>
  <div class="text-center">
    <v-dialog
      v-model="active"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="text-left"
             v-bind="attrs"
             v-on="on"
        >
          <slot></slot>
        </div>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add new user
        </v-card-title>

        <v-card-text class="my-4">
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="newUser.username"
                    :rules="stringRules"
                    label="Username"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="newUser.name"
                    :rules="stringRules"
                    label="Name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="newUser.email"
                    :rules="emailRules"
                    label="Email"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="newUser.website"
                    :rules="websiteRules"
                    label="Website"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="newUser.phone"
                    :rules="phoneRules"
                    label="Phone"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <h3>Address information</h3>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newUser.address.street"
                    :rules="stringRules"
                    label="Street"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newUser.address.suite"
                    :rules="stringRules"
                    label="Suite"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newUser.address.city"
                    :rules="stringRules"
                    label="City"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newUser.address.zipcode"
                    :rules="stringRules"
                    label="Zipcode"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <h3>Company information</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="newUser.company.name"
                    :rules="stringRules"
                    label="Company name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="newUser.company.catchPhrase"
                    :rules="stringRules"
                    label="Catch Phrase"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="newUser.company.bs"
                    :rules="stringRules"
                    label="Dedication"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-space-between">
          <v-btn
            color="error"
            text
            @click="active = false"
          >
            Close
          </v-btn>

          <div class="">
            <v-btn
              v-if="method === 'update'"
              color="error"
              plain
              @click="deleteUser"
            >
              Delete
            </v-btn>

            <v-btn
              v-if="method === 'create'"
              color="primary"
              @click="createUser"
            >
              Save
            </v-btn>

            <v-btn
              v-else
              color="primary"
              @click="updateUser"
            >
              Update
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ModalAlert :msg="alertMessage" :active="alertAtive"></ModalAlert>
  </div>
</template>

<script lang="js">
import {ApiUsers} from "@/repositories/Users";
import ModalAlert from "~/components/modals/ModalAlert.vue";

export default {
  name: "ModalCreateUser",
  components: {
    'ModalAlert': ModalAlert
  },
  computed: {
    userData() {
      return this.$store.state.user.user
    }
  },
  data() {
    const active = false;
    const alertAtive = false;
    const alertMessage = "";
    const action = "";

    const valid = true;
    const newUser = {
      name: '',
      username: '',
      email: '',
      phone: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    };
    const stringRules = [
      v => !!v || 'Can not be empty',
    ];
    const emailRules = [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];
    const phoneRules = [
      v => !!v || 'Phone is required',
      v => /^[6-7][0-9]{8}$/.test(v) || 'Phone must be valid (example: "798123456" or "656788983")',
    ];
    const websiteRules = [
      v => !!v || 'Website is required',
      v => /.+\..+/.test(v) || 'Website must be valid',
    ];

    return {
      active,
      alertAtive,
      alertMessage,
      action,

      valid,
      newUser,
      stringRules,
      emailRules,
      phoneRules,
      websiteRules
    }
  },
  beforeMount() {
    if (this.userData.name && this.method === 'update') {
      const userDataString = JSON.stringify(this.userData)
      this.newUser = JSON.parse(userDataString);
    }
  },
  methods: {
    async createUser() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const newUser = await ApiUsers.createUser(this.newUser);

      if (newUser.status === 201) {
        this.$store.commit('user/createUser', newUser.user);
      }

      this.alertAtive = true;
      this.alertMessage = newUser.msg;
    },
    async updateUser() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const updateUser = await ApiUsers.updateUser(this.newUser);
      this.alertAtive = true;
      this.alertMessage = updateUser.msg;

      if (updateUser.status === 200) {
        this.$store.commit('user/updateUser', updateUser.user);
      }
    },
    async deleteUser() {
      const deleteUser = await ApiUsers.deleteUser(this.newUser);

      if (deleteUser.statusText === 'OK') {
        this.alertAtive = true;
        this.alertMessage = deleteUser.msg;
        this.$store.commit('user/removeUser', this.newUser);
        this.action = 'delete';
      }
    }
  },
  watch: {
    alertAtive(val) {
      if (!val) return

      setTimeout(() => {
        this.alertAtive = false;
        this.active = false;

        if (this.action === 'delete') {
          return this.$router.push('/');
        }
      }, 1200)
    },
  },
  props: {
    method: {
      type: String,
      default: 'create'
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-card__title {
    background: linear-gradient(145deg, rgba(120,62,141,1) 55%, rgba(173,110,199,1) 100%);
    color: white;
  }
</style>

