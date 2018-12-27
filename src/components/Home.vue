<template>
    <div>
        <h1 class="__header_title">Finding Falcone!</h1>
        <h2 class="__select_planet">Select planets you want to search in - </h2>

        <v-flex d-flex sm7 mt-5 class="__select_destination">
            <v-select :items="items" @change="selectDestination1" label="Select Destination 1" outline></v-select>
            <v-select :items="items" @change="selectDestination2" label="Select Destination 2" outline></v-select>
            <v-select :items="items" @change="selectDestination3" label="Select Destination 3" outline></v-select>
            <v-select :items="items" @change="selectDestination4" label="Select Destination 4" outline></v-select>
        </v-flex>

        <!--- LIST OF VEHICLES -->
        <v-flex d-flex sm7 class="__vehicles_list">
            <!--- 1st DESTINATION -->
            <v-flex mt-3>
                <v-radio-group v-model="radioGroup" v-show="showFirstDestinationVehicles">
                    <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
                </v-radio-group>
            </v-flex>

            <!-- 2nd Destination -->
            <v-flex mt-3>
                <v-radio-group v-model="radioGroup" v-show="showSecondDestinationVehicles">
                    <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
                </v-radio-group>
            </v-flex>

            <!-- 3rd Destination -->
            <v-flex mt-3>
                <v-radio-group v-model="radioGroup" v-show="showThirdDestinationVehicles">
                    <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
                </v-radio-group>
            </v-flex>

            <!-- 4th Destination -->

            <v-flex mt-3>
                <v-radio-group v-model="radioGroup" v-show="showFourthDestinationVehicles">
                    <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-flex>

        <div class="__find_falcon ">
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
          selected_vehicle_names: [],
          showFirstDestinationVehicles: false,
          showSecondDestinationVehicles: false,
          showThirdDestinationVehicles: false,
          showFourthDestinationVehicles: false
        };
      },

      mounted() {
        this.getPlanets();
        this.getVehicles();
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
        },
        selectDestination1(a) {
          this.selected_planet_names.push(a);
          this.showFirstDestinationVehicles = true;
        },
        selectDestination2(a) {
          this.selected_planet_names.push(a);
          this.showSecondDestinationVehicles = true;
        },
        selectDestination3(a) {
          this.selected_planet_names.push(a);
          this.showThirdDestinationVehicles = true;
        },
        selectDestination4(a) {
          this.selected_planet_names.push(a);
          this.showFourthDestinationVehicles = true;
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
      margin-top: 5%;
      text-align: center;
    }
    .__vehicles_list {
      margin-left: 23%;
      margin-right: 20%;
    }
</style>
