<template>
  <div>
    <span v-if="error">
      <v-alert dismissible :value="true" type="error">
        {{error}}
      </v-alert>
    </span>
    <span v-if="!success">
      <h1 class="__header_title">Finding Falcone!</h1>
      <h2 class="__select_planet">Select planets you want to search in - </h2>

      <v-flex d-flex sm7 mt-5 class="__select_destination">

        <v-autocomplete :items="items" hide-selected flat :search-input.sync="search.dest1" @change="selectDestination1" label="Select Destination 1" outline>
        </v-autocomplete>

        <v-autocomplete :items="items" hide-selected flat :search-input.sync="search.dest2" @change="selectDestination2" label="Select Destination 2" outline></v-autocomplete>

        <v-autocomplete :items="items" hide-selected flat :search-input.sync="search.dest3" @change="selectDestination3" label="Select Destination 3" outline></v-autocomplete>

        <v-autocomplete :items="items" hide-selected flat :search-input.sync="search.dest4" @change="selectDestination4" label="Select Destination 4" outline></v-autocomplete>

      </v-flex>

      <!--- LIST OF VEHICLES -->
      <v-flex d-flex sm7 class="__vehicles_list">
        <!--- 1st DESTINATION -->
        <v-flex mt-3>

          <v-radio-group v-model="radioFirst" v-show="showFirstDestinationVehicles">
            <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
          </v-radio-group>

        </v-flex>

        <!-- 2nd Destination -->
        <v-flex mt-3>
          <v-radio-group v-model="radioSecond" v-show="showSecondDestinationVehicles">
            <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
          </v-radio-group>
        </v-flex>

        <!-- 3rd Destination -->
        <v-flex mt-3>
          <v-radio-group v-model="radioThird" v-show="showThirdDestinationVehicles">
            <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
          </v-radio-group>
        </v-flex>

        <!-- 4th Destination -->

        <v-flex mt-3>
          <v-radio-group v-model="radioFourth" v-show="showFourthDestinationVehicles">
            <v-radio v-for="(vehicle, index) in vehicles" :key="index" :label="vehicle.name" :value="vehicle.name"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-flex>

      <div class="__find_falcon ">
        <v-btn @click="findFalcon" dark>Find Falcon</v-btn>
      </div>
    </span>
    <span v-else>
      <div class="__result">
        Success! Congratulations on Finding Falcone.King Shan is mighty pleased.

        <br/>
        <span> Planet Name -
          <b>{{result.planet_name}}</b>
        </span>
        <br/>
        <v-btn class="mt-4" @click="startAgain">Start Again</v-btn>
      </div>
    </span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [],
        vehicles: [],
        token: null,
        search: {
          dest1: null,
          dest2: null,
          dest3: null,
          dest4: null
        },
        result: null,
        success: false,
        planet_names: [],
        selected_planet_names: [],
        selected_vehicle_names: [],
        radioFirst: null,
        radioSecond: null,
        radioThird: null,
        radioFourth: null,
        showFirstDestinationVehicles: false,
        showSecondDestinationVehicles: false,
        showThirdDestinationVehicles: false,
        showFourthDestinationVehicles: false,
        error: null
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
          this.planet_names = res.data;
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
        this.selected_vehicle_names = [
          this.radioFirst,
          this.radioSecond,
          this.radioThird,
          this.radioFourth
        ];
        this.$http
          .post(
            'https://findfalcone.herokuapp.com/find',
            {
              token: this.token,
              planet_names: this.selected_planet_names,
              vehicle_names: this.selected_vehicle_names
            },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          )
          .then(res => {
            this.result = res.data;
            this.success = true;
            this.selected_planet_names = [];
            this.selected_vehicle_names = [];
          })
          .catch(error => {
            this.error = error.response.data.error;
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
      },
      startAgain() {
        this.success = false;
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
  .__result {
    font-size: 24px;
    text-align: center;
    margin-top: 20%;
  }
</style>
