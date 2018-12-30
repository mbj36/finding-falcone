<template>
    <div class="text-xs-center mt-5" v-show="loader">
        <v-progress-circular :size="70" :width="7" indeterminate color="primary"></v-progress-circular>
    </div>
</template>

<script>
    export default {
      props: {
        loader: {
          type: Boolean
        }
      }
    };
</script>
