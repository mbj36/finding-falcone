<template>
    <span>
        <p class="text-sm-center mt-3" v-if="selectedPlanetNames.length > 3">
            Now Select the vehicles...you can't change the planet names now but you can always start fresh by resetting
        </p>
        <div class="mt-2 d-flex __vehicles_list" v-if="selectedPlanetNames.length > 3">

            <v-radio-group v-model="form.radio[0]">

                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selectedPlanet[0].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>

            <v-radio-group v-model="form.radio[1]">

                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selectedPlanet[1].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>

            <v-radio-group v-model="form.radio[2]">

                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selectedPlanet[2].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

            </v-radio-group>

            <v-radio-group v-model="form.radio[3]">

                <v-radio v-for="(vehicle, index) in vehicles" :key="index" @change="timeTaken(vehicle.max_distance, vehicle.speed)" :disabled="vehicle.max_distance < selectedPlanet[3].distance" :label="`${vehicle.name} (${vehicle.total_no})`" :value="vehicle.name"></v-radio>

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
