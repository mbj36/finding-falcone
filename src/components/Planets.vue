<template>
  <span>
    <p class="text-sm-center mt-3" v-if="selectedPlanetNames.length < 4">
      Please first select all the four destinations
    </p>
    <span class="__select_destination">

      <span v-for="(planet_name, index) in allPlanets" :key="index" v-show="index < 4">

        <v-autocomplete :disabled="selectedPlanetNames.length > 3" :items="items" flat :search-input.sync="search.dest + `${index+1}`" @change="selectDestination(index + 1, $event)" :label="`Select Destination` +  ` ${index+1}`" outline>
        </v-autocomplete>

      </span>
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      allPlanets: {
        type: Array
      },
      selectedPlanetNames: {
        type: Array
      },
      selectDestination: {
        type: Function
      },
      search: {
        type: Object
      },
      items: {
        type: Array
      }
    }
  };
</script>

<style>
  .__select_destination {
    display: inline-flex;
  }
  .__select_destination > span {
    margin-left: 1% !important;
  }
  @media screen and (max-width: 40em) {
    .__select_destination {
      margin-left: 0%;
      display: grid;
    }
  }
</style>
