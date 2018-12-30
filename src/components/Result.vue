<template>
    <div class="__result">
        Success! Congratulations on Finding Falcone.King Shan is mighty pleased.

        <br/>
        <span> Planet Name -
            <b>{{planetName}}</b>
        </span>
        <span> Time Taken -
            <b>{{totalTimeTaken}}</b>
        </span>
        <br/>
        <v-btn class="mt-4" @click="startAgain">Start Again</v-btn>
    </div>
</template>


<script>
    export default {
      props: {
        totalTimeTaken: {
          type: Number
        },
        planetName: {
          type: String
        },
        startAgain: {
          type: Function
        }
      }
    };
</script>

<style>
    .__result {
      font-size: 24px;
      text-align: center;
      margin-top: 20%;
    }
</style>
