<template>
  <v-app>
    <div id="app">
      <Header/>
      <!-- View -->
      <router-view/>
    </div>
    <Footer/>
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
    display: inline-flex;
  }
  .__vehicles_list > div {
    justify-content: space-between;
  }
  @media screen and (max-width: 40em) {
    .__vehicles_list {
      width: 100%;
      margin-left: 0%;
    }
  }
  .__show_destination {
    text-align: center;
  }
</style>
