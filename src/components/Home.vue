<template>
  <div>
    <!--- error message -->
    <Alert :error="error" :status="status" />

    <span v-if="!success">
      <h1 class="__header_title">Finding Falcone!</h1>
      <h2 class="__select_planet">Select planets you want to search in - </h2>

      <h3 class="text-sm-center mt-3">
        <b>Time Taken - {{totalTimeTaken}} </b>
      </h3>

      <Progress :loader="loader" />

      <div v-if="show" class="mt-4 __show_destination">

        <Planets :allPlanets="planet_names" :selectedPlanetNames="selected_planet_names" :selectDestination="selectDestination" :search="search" :items="items" />

        <Vehicle :form="form" :selectedPlanetNames="selected_planet_names" :vehicles="vehicles" :selectedPlanet="selected_planet" :timeTaken="timeTaken" />

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
  import Vehicle from './Vehicles';
  import Alert from './Alert';
  import Progress from './Progress';
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
      obj: null,
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
      Planets,
      Vehicle,
      Alert,
      Progress
    },

    mounted() {
      this.getPlanets();
      this.getVehicles();
    },

    created() {
      this.getToken();
    },

    methods: {
      timeTaken(distance, speed, n) {
        this.obj = {
          ...this.obj,
          [n]: distance / speed
        };

        let values = Object.values(this.obj);

        let sum = values.reduce((a, b) => a + b, 0);

        this.totalTimeTaken = sum;
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

        let counts = {};

        for (let i = 0; i < this.selected_vehicle_names.length; i++) {
          let num = this.selected_vehicle_names[i];
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        if (
          counts['Space pod'] > 2 ||
          counts['Space rocket'] > 1 ||
          counts['Space shuttle'] > 1 ||
          counts['Space ship'] > 2
        ) {
          this.error =
            'There are only 2 Space Pods, 2 Space Ship, 1 Space rocket and 1 Space Shuttle available, You have exceeded the amount';
        } else {
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
        }
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


