<template>
    <v-app>
        <Header/>
        <div id="app">
            <router-view/>
        </div>
        <Footer/>
    </v-app>
</template>

<script>
    import Header from './components/Header';
    import Footer from './components/Footer';
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
      min-height: 500px;
    }
</style>
