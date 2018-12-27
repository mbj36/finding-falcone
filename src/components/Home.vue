<template>
    <div>
        <h1 class="__header_title">Finding Falcone!</h1>
        <h2 class="__select_planet">Select planets you want to search in - </h2>
        <v-flex d-flex xs12 sm7 mt-5 class="__select_destination">
            <v-select :items="items" label="Select Destination 1" outline></v-select>
            <v-select :items="items" label="Select Destination 2" outline></v-select>
            <v-select :items="items" label="Select Destination 3" outline></v-select>
            <v-select :items="items" label="Select Destination 4" outline></v-select>
        </v-flex>
        <div class="__find_falcon">
            <v-btn>Find Falcon</v-btn>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          items: [],
          vehicles: [],
          token: null,
          selected_planet_names: [],
          selected_vehicle_names: []
        };
      },

      mounted() {
        this.getPlanets();
        this.getToken();
      },

      methods: {
        getPlanets() {
          this.$http.get('https://findfalcone.herokuapp.com/planets').then(res => {
            this.items = res.data.map(data => data.name);
          });
        },

        getVehicles() {
          this.$http.get('https://findfalcone.herokuapp.com/vehicles').then(res => {
            this.vehicles = res.data;
          });
        },

        getToken() {
          this.$http
            .post(
              'https://findfalcone.herokuapp.com/token',
              {},
              {
                headers: {
                  Accept: 'application/json'
                }
              }
            )
            .then(res => {
              this.token = res.data.token;
            });
        },

        findFalcon() {
          this.$http
            .post('https://findfalcone.herokuapp.com/find', {
              token: this.token,
              planet_names: this.selected_planet_names,
              vehicle_names: this.selected_vehicle_names
            })
            .then(res => {
              alert('Thanks');
            });
        }
      },
      computed: {
        getPlanetName() {
          return this.items;
        }
      }
    };
</script>

<style>
    .__header_title {
      font-size: 3rem;
      text-align: center;
      margin-top: 3rem;
    }

    .__select_planet {
      text-align: center;
      margin-top: 1rem;
    }

    .__select_destination {
      margin-left: 20%;
    }

    .__select_destination > div {
      margin-left: 2% !important;
    }
    .__find_falcon {
      margin-top: 10%;
      text-align: center;
    }
</style>
