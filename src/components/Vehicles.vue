<template>
    <span>
        <p class="text-sm-center mt-3" v-if="selectedPlanetNames.length > 3">
            Now Select the vehicles for each planet...you can't change the planet names now but you can always start fresh by resetting
        </p>

        <div class="__vehicles_list" v-if="selectedPlanetNames.length > 3">

            <v-radio-group v-model="form.radio[0]">
                <p>
                    <b>{{selectedPlanetNames[0]}}</b>
                </p>
                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed, 1)" :disabled="vehicle.max_distance < selectedPlanet[0].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>

            <v-radio-group v-model="form.radio[1]">
                <p>
                    <b>{{selectedPlanetNames[1]}}</b>
                </p>
                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed, 2)" :disabled="vehicle.max_distance < selectedPlanet[1].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>

            <v-radio-group v-model="form.radio[2]">
                <p>
                    <b>{{selectedPlanetNames[2]}}</b>
                </p>
                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed, 3)" :disabled="vehicle.max_distance < selectedPlanet[2].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>

            <v-radio-group v-model="form.radio[3]">
                <p>
                    <b>{{selectedPlanetNames[3]}}</b>
                </p>
                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed, 4)" :disabled="vehicle.max_distance < selectedPlanet[3].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>
        </div>
    </span>
</template>

<script>
    export default {
      props: {
        form: {
          type: Object
        },
        selectedPlanetNames: {
          type: Array
        },
        vehicles: {
          type: Array
        },
        selectedPlanet: {
          type: Array
        },
        timeTaken: {
          type: Function
        }
      }
    };
</script>
