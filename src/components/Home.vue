<template>
  <div>

    <!--- error message -->
    <span v-if="error">
      <v-alert dismissible :value="true" type="error">
        {{error}}, please reset and try again
      </v-alert>
    </span>

    <!-- Not successful in finding falcone -->
    <span v-if="status === 'false'">
      <v-alert dismissible :value="true" type="error">
        Falcone not found, Please reset and try again in finding falcone
      </v-alert>
    </span>

    <span v-if="!success">
      <h1 class="__header_title">Finding Falcone!</h1>
      <h2 class="__select_planet">Select planets you want to search in - </h2>

      <h3 class="text-sm-center mt-3">
        <b>Time Taken - {{totalTimeTaken}} </b>
      </h3>

      <div class="text-xs-center mt-5" v-show="loader">
        <v-progress-circular :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
      </div>

      <p class="text-sm-center mt-3" v-if="selected_planet_names.length < 4">
        Please first select all the four destinations
      </p>

      <div v-if="show" class="mt-4">

        <Planets :allPlanets="planet_names" :selectedPlanetNames="selected_planet_names" :selectDestination="selectDestination" :search="search" :items="items" />

        <p class="text-sm-center mt-3" v-if="selected_planet_names.length > 3">
          Now Select the vehicles...you can't change the planet names now but you can always start fresh by resetting
        </p>

        <div class="mt-2 d-flex __vehicles_list" v-if="selected_planet_names.length > 3">

          <v-radio-group v-model="form.radio[0]">

            <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selected_planet[0].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

          </v-radio-group>

          <v-radio-group v-model="form.radio[1]">

            <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selected_planet[1].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

          </v-radio-group>

          <v-radio-group v-model="form.radio[2]">

            <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selected_planet[2].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

          </v-radio-group>

          <v-radio-group v-model="form.radio[3]">

            <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selected_planet[3].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

          </v-radio-group>
        </div>

      </div>

      <div class="__find_falcon ">
        <v-btn @click="findFalcon" v-show="selected_planet_names.length > 3" dark>Find Falcon</v-btn>
        <v-btn @click="resetData">Reset</v-btn>
      </div>

    </span>

    <!-- Success page -->

    <span v-else>
      <Result :totalTimeTaken="totalTimeTaken" :planetName="result.planet_name" :startAgain="startAgain" />
    </span>

  </div>
</template>

<script>
  import Result from './Result';
  import Planets from './Planets';
  function initialState() {
    return {
      items: [],
      totalTimeTaken: 0,
      vehicles: [],
      token: null,
      search: {
        dest1: null,
        dest2: null,
        dest3: null,
        dest4: null
      },
      current_selected_planet: null,
      selected_planet: [],
      status: true, // API response status
      show: true,
      result: null,
      success: false,
      planet_names: [],
      selected_planet_names: [],
      selected_vehicle_names: [],
      form: {
        radio: []
      },
      loader: true, // initial loader
      error: null, // to show error message based on conditions
      prevIndex: '' // used to check before pushing into the selected_items array
    };
  }

  export default {
    data() {
      return initialState();
    },

    components: {
      Result,
      Planets
    },

    mounted() {
      this.getPlanets();
      this.getVehicles();
    },

    created() {
      this.getToken();
    },

    methods: {
      timeTaken(d, s) {
        this.totalTimeTaken = this.totalTimeTaken + d / s;
      },
      getPlanets() {
        this.$http.get('/planets').then(res => {
          this.planet_names = res.data;
          this.loader = false;
          this.items = res.data
            .map(data => {
              return {
                text: data.name,
                value: data.name
              };
            })
            .filter(data => !data.isSelected);
        });
      },

      getVehicles() {
        this.$http.get('/vehicles').then(res => {
          this.vehicles = res.data;
        });
      },

      getToken() {
        this.$http
          .post(
            '/token',
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
        this.selected_vehicle_names = this.form.radio;
        this.$http
          .post(
            '/find',
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
            this.status = res.data.status;
            if (res.data.status !== 'false') {
              this.success = true;
              this.selected_planet_names = [];
              this.selected_vehicle_names = [];
            }
          })
          .catch(error => {
            this.error = error.response.data.error;
          });
      },

      selectDestination(index, planet) {
        this.items = this.items.map(item => {
          if (item.text === planet) {
            return {
              text: item.text,
              value: item.value,
              disabled: true
            };
          } else {
            return item;
          }
        });

        this.current_selected_planet = planet;

        this.planet_names.map(planet => {
          if (this.current_selected_planet === planet.name) {
            this.selected_planet.push(planet);
          }
        });

        if (this.prevIndex === index) {
          this.selected_planet_names.splice(-1, 1);
        }
        this.prevIndex = index;
        this.selected_planet_names.includes(planet)
          ? null
          : this.selected_planet_names.push(planet);
      },

      startAgain() {
        this.resetData();
      },

      resetData() {
        Object.assign(this.$data, initialState());
        this.getPlanets();
        this.getVehicles();
        this.getToken();
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
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

  .__find_falcon {
    margin-top: 3%;
    text-align: center;
  }
  .__vehicles_list {
    width: 60%;
    margin-left: 23%;
  }
  @media screen and (max-width: 40em) {
    .__vehicles_list {
      width: 100%;
      margin-left: 0%;
    }
  }
</style>
