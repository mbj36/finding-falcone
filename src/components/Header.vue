<template>
    <v-toolbar color="deep-purple darken-4">
        <v-toolbar-side-icon color="white"></v-toolbar-side-icon>

        <v-toolbar-title>
            <router-link to="/" class="white--text text-center">Finding Falcone</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>
                <router-link class="white--text" to="/">Home</router-link>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>


<script>
    export default {};
</script>

<style>
    a {
      text-decoration: none;
    }
</style>
