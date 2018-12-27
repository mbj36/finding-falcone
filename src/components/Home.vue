<template>
    <div>
        <h1 class="__header_title">Finding Falcone!</h1>
        <h2 class="__select_planet">Select planets you want to search in - </h2>
        <v-flex xs12 sm9 d-flex justify-center>
            <v-select :items="getPlanetName" label="Select" outline></v-select>
            <v-select :items="getPlanetName" label="Select" outline></v-select>
            <v-select :items="getPlanetName" label="Select" outline></v-select>
            <v-select :items="getPlanetName" label="Select" outline></v-select>
        </v-flex>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          items: []
        };
      },

      mounted() {
        this.getPlanets();
      },

      methods: {
        getPlanets() {
          this.$http.get('https://findfalcone.herokuapp.com/planets').then(res => {
            this.items = res.data;
          });
        }
      },
      computed: {
        getPlanetName() {
          return this.items.map(item => item.name);
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
</style>
