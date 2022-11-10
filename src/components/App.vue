<template>
  <section class="wellnessPlan">
    <header>
      <h1 class="wellness-header">2021 wellness plan</h1>
    </header>
    <div class="wellness-plan-div">
      <div class="flex-container">
       <div>
        <h3>Your progress <span class="steps-to-complete"><strong>{{ remaining }}</strong>
        {{ pluralize(remaining, 'step') }} to complete</span>  </h3>
       </div>
        <div class="hide-btn">
        <button @click="show = !show">hide</button>
      </div>
      </div>
      <Transition>
        <div class="flex-container" v-if="show">
        <div class="flex-item-left">
            <WellnessPlan/>
        </div>
     <div class="flex-item-right">
      <div class="flex-container wellness-plan-div months-div">
        <div v-for="(val, key) in filters" :key="key" class="months">
          <a :href="'#/' + key"
            :class="{ selected: jan === key }"
            @click="jan = key">{{ capitalize(key) }}</a>
        </div>
      </div>
     
   <div class="add-appointment">
    <input class="new-app"
        autofocus
        autocomplete="off"
        placeholder="Add new appointment"
        @keyup.enter="addApp"> 
   </div>
    <!-- main section -->
    <section class="main" v-show="apps.length">
      <ul class="app-list plans">
        <AppItem
          v-for="(app, index) in filteredJan"
          :key="index"
          :app="app"
        />
      </ul>
    </section>
  </div>
</div>
  
</Transition>


</div>
  
   
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import WellnessPlan from './WellnessPlan.vue'
import AppItem from './AppItem.vue'

const filters = {
  Jan: apps => apps,
  Feb: apps => apps,
  Mar: apps => apps,
  Apr: apps => apps,
  May: apps => apps,
  June: apps => apps,
  July: apps => apps,
  Aug: apps => apps,
  Sep: apps => apps,
  Oct: apps => apps,
  Nov: apps => apps,
  Dec: apps => apps,
}

export default {
  components: {WellnessPlan, AppItem },
  data(){
    return{
      show:true
    }
  },
 
  setup () {
    const jan = ref('Jan')
    const feb = ref('Feb')
    const march = ref('Mar')
    const april = ref('Apr')
    const may = ref('May')
    const june = ref('June')
    const july = ref('July')
    const aug = ref('Aug')
    const sep = ref('Sep')
    const oct = ref('Oct')
    const nov = ref('Nov')
    const dec = ref('Dec')


    const store = useStore()

    const apps = computed(() => store.state.apps)
    const allChecked = computed(() => apps.value.every(app => app.done))
    const filteredJan= computed(() => filters[jan.value](apps.value))
    const filteredFeb = computed(() => filters[feb.value](apps.value))
    const filteredMarch = computed(() => filters[march.value](apps.value))
    const filteredApril = computed(() => filters[april.value](apps.value))
    const filteredMay = computed(() => filters[may.value](apps.value))
    const filteredJune = computed(() => filters[june.value](apps.value))
    const filteredJuly = computed(() => filters[july.value](apps.value))
    const filteredAug = computed(() => filters[aug.value](apps.value))
    const filteredSep = computed(() => filters[sep.value](apps.value))
    const filteredOct = computed(() => filters[oct.value](apps.value))
    const filteredNov = computed(() => filters[nov.value](apps.value))
    const filteredDec = computed(() => filters[dec.value](apps.value))

    const remaining = computed(() => apps.value.filter(app => !app.done).length)

    const toggleAll = (done) => store.dispatch('toggleAll', done)

    function addApp (e) {
      const text = e.target.value;
      if (text.trim()) {
        store.dispatch('addApp', text)
      }
      e.target.value = ''
    }

    const pluralize = (n, w) => n === 1 ? w : (w + 's')
    const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

    return {
      filters,
      apps,
      allChecked,
      remaining,
      filteredJan,
      filteredFeb,
      filteredMarch,
      filteredApril,
      filteredMay,
      filteredJune,
      filteredJuly,
      filteredAug,
      filteredSep,
      filteredOct,
      filteredNov,
      filteredDec,
      addApp,
      toggleAll,
      pluralize,
      capitalize
    }
  }
}
</script>

<style>
  h3{
    padding-left: 1rem;
    font-size: 20px;
    text-transform: capitalize;
    margin: 0;
  }
  .steps-to-complete{
    color: #929396;
    font-size: 13px;
  }
  .hide-btn{
    margin-left: auto!important;
    margin-top:0px;
  }
  .hide-btn button{
    border: none;
    background: none;
    color: #929396;
    border-bottom: 1px solid #929396;
    margin-right: 1rem;
    margin-top: 1rem;
    padding: 0;
    cursor: pointer;
  }
  .wellness-header{
    text-transform: capitalize;
    padding-left: 1rem;
    font-weight: 600;
    font-size: 27px;
  }
  .wellness-plan-div{
    border: 2px solid #EFF2F2;
    border-radius: 15px
  }
  .months a{
    color: #1864A6;
    font-size: 20px;
    padding: 32px;
    text-decoration: none;
  }
  .months-div{
    margin-right: 2rem;
  }
  .plans{
    padding: 0;
  }
  .add-appointment{
    text-align: end;
    margin-right: 2rem;
  }
  .add-appointment input{
    border: 2px solid #EFF2F2;
    border-radius: 10px;
    padding: 10px;
  }
/* flex */
  .flex-container {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;

  }

  .flex-container > div {
    text-align: center;
    line-height: 75px;
    font-size: 30px;
  }
  .flex-item-left {
  flex: 20%;
}

.flex-item-right {
  flex: 80%;
}
/* transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/* media */

@media (max-width: 800px) {
  .flex-container{
    flex-wrap: wrap;
  }
  .flex-item-right, .flex-item-left {
    flex: 100%;
  }
}
</style>