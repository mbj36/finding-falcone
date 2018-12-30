<template>
    <span>
        <span v-if="error">
            <v-alert dismissible :value="true" type="error">
                {{error}}, please reset and try again
            </v-alert>
        </span>
        <span v-if="status === 'false'">
            <v-alert dismissible :value="true" type="error">
                Falcone not found, Please reset and try again in finding falcone
            </v-alert>
        </span>
    </span>
</template>

<script>
    export default {
      props: {
        error: {
          type: String
        },
        status: {
          type: [Boolean, String]
        }
      }
    };
</script>
