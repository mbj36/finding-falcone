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
                Not Successful, Please reset and try again in finding falcone
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

            <p class="text-sm-center mt-3" v-if="selected_planet_names.length > 3">
                Now Select the vehicles...you can't change the planet names now but you can always start fresh by resetting
            </p>

            <div v-if="show" class="__select_destination mt-4">

                <span v-for="(planet_name, index) in planet_names" :key="index" v-show="index < 4">

                    <v-autocomplete :disabled="selected_planet_names.length > 3" :items="items" flat :search-input.sync="search.dest + `${index+1}`" @change="selectDestination(index + 1, $event)" :label="`Select Destination` +  ` ${index+1}`" outline>
                    </v-autocomplete>

                    <v-flex class="__vehicles_list">

                        <div class="mt-2">

                            <v-radio-group v-model="form.radio[index]" v-if="selected_planet_names.length > 3">

                                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name" :disabled="vehicle.max_distance < selected_planet[index].distance"></v-radio>

                            </v-radio-group>

                        </div>

                    </v-flex>
                </span>

            </div>

            <div class="__find_falcon ">
                <v-btn @click="findFalcon" v-show="selected_planet_names.length > 3" dark>Find Falcon</v-btn>
                <v-btn @click="resetData">Reset</v-btn>
            </div>

        </span>

        <!-- Success page -->

        <span v-else>
            <div class="__result">
                Success! Congratulations on Finding Falcone.King Shan is mighty pleased.

                <br/>
                <span> Planet Name -
                    <b>{{result.planet_name}}</b>
                </span>
                <span> Time Taken -
                    <b>{{totalTimeTaken}}</b>
                </span>
                <br/>
                <v-btn class="mt-4" @click="startAgain">Start Again</v-btn>
            </div>
        </span>

    </div>
</template>

<script>
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

    .__select_destination {
      margin-left: 20%;
      display: inline-flex;
    }

    @media screen and (max-width: 40em) {
      .__select_destination {
        margin-left: 0%;
        display: grid;
      }
    }

    .__select_destination > span {
      margin-left: 2% !important;
    }
    .__find_falcon {
      margin-top: 3%;
      text-align: center;
    }
    .__vehicles_list {
      margin-left: 5%;
      display: inline-flex;
      width: 100%;
    }
    .__result {
      font-size: 24px;
      text-align: center;
      margin-top: 20%;
    }
</style>
