<template>
    <v-app>
        <div id="app">
            <Header/>
            <!-- View -->
            <router-view/>
            <Footer/>
        </div>
    </v-app>
</template>

<script>
    import Header from './components/Header'; // Header Component
    import Footer from './components/Footer'; // Footer Component
    export default {
      name: 'app',
      components: {
        Header,
        Footer
      }
    };
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #2c3e50;
    }
    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 1rem;
      background-color: #efefef;
      text-align: center;
    }
</style>
