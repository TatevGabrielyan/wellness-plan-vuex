<template>
    <radial-progress-bar :diameter="250"
                         :completed-steps="completedSteps"
                         :total-steps="totalSteps"
                         :start-Color="startColor"
                         :stop-Color="stopColor"
                         :inner-stroke-color="innerStrokeColor"
                         :stroke-width="strokeWidth"
                         :stroke-linecap="strokeLinecap"
                         :inner-stroke-width="innerStrokeWidth">
     <p class="completed-steps"> {{ completedSteps }} %</p>
    </radial-progress-bar>
    <p class="completed-apps">Completed <br> appointments</p>
  </template>
  
  <script>
  import RadialProgressBar from 'vue-radial-progress'
  
  export default {

    data () {
      return {
        completedSteps: this.$store.getters.steps,
        totalSteps: 100,
        startColor: '#61B058',
        stopColor: '#B0D4E2',
        innerStrokeColor:'#F1F2F3',
        strokeWidth:20,
        strokeLinecap:'square',
        innerStrokeWidth:20
      }
    },
  
    components: {
      RadialProgressBar
    },
  
    mounted(){
      
      let nmb = 20;
      let apps = document.querySelectorAll('.appointments').length;
      apps *= nmb;
      if(apps < 100){
        this.completedSteps = apps;
      }else{
        this.completedSteps = '100'
      }
    
  },

  }
  </script>
  <style>
  .completed-steps{
    font-size: 37px;
  }
    .completed-apps{
        font-size: 16px;
        white-space: pre-wrap;
        margin: 0;
        color: #7F7F7F;
        line-height: normal;
    }
    .radial-progress-container{
  width: 100%!important;
}
  </style>
