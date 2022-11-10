<template>
  <li class="app appointments" :class="{ completed: app.done, editing }" >
    <div class="view flex-container">
     <div class="completed-item-left">
      <label v-text="app.text" @click="editing = true"></label>
     </div>
     <div class="completed-item-right">
        <label class="container">
          <span class="completed-span">Completed</span>
  <input type="checkbox"  :checked="app.done"
        @change="toggleApp(app)" class="toggle select-checkbox">
  <span class="mark "></span>
</label>
<div class="dropdown" style="float:right;">
  <button class="dropbtn">...</button>
  <div class="dropdown-content">
    <button class="destroy" @click="removeApp(app)">Delete</button>
  </div>
</div>
     
     </div>
    </div>
    <input class="edit"
      v-show="editing"
      :value="app.text"
      ref="input"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit">
  </li>
</template>

<script>
import { ref, watch, nextTick } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'To-do',
  props: ['app'],
  
  setup (props) {
    const input = ref(null)

    const editing = ref(false)

    watch(editing, (v) => {
      v && nextTick(() => { input.value.focus() })
    })

    const store = useStore()
    const editApp = (app, value) => store.dispatch('editApp', { app, value })
    const toggleApp = (app) => store.dispatch('toggleApp', app)
    const removeApp = (app) => store.dispatch('removeApp', app)

    function doneEdit (e) {
      const value = e.target.value.trim()
      if (!value) {
        removeApp(props.app)
      } else if (editing.value) {
        editApp(props.app, value)
      }
      editing.value = false
    }

    function cancelEdit (e) {
      e.target.value = props.app.text
      editing.value = false
    }
    return {
      input,
      editing,
      toggleApp,
      doneEdit,
      cancelEdit,
      removeApp
    }
  },

}
</script>
<style>
.appointments{
  list-style: none;
  margin-bottom: 1rem;
}
.appointments div{
    border: 2px solid #EFF2F2;
    border-radius: 15px;
    margin-right: 2rem;
}
.completed-item-left, .completed-item-right{
  border: none!important;
}
.completed-item-right{
  margin-left: auto!important;
}
.completed-item-left label{
    color: #969696;
    font-size: 20px;
    padding: 1rem;
}
.completed-item-right span{
  color: #61B058;
    font-size: 20px;
    border: 1px solid #61B058;
}


.dropbtn {
  border: none;
  cursor: pointer;
  background: none;
  vertical-align: middle;
}

.dropdown {
  position: relative;
  display: inline-block;
  border: none!important;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    z-index: 1;
    padding: 0; 
    margin: 0;
    background: white;
    line-height: 0;
    border: none!important;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
}
.destroy{
   color: red;
    background: white;
    border: white;
    filter: drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16));
    padding: 5px 10px;
    position: relative;
    top: -1rem;
}
span {
    color: #34495E;
    padding: 0.5rem 0.25rem;
}


/* checkbox */
.container {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 25px;
}

/* Hide the default checkbox */
.container input {
  visibility: hidden;
  cursor: pointer;
}

/* Create a custom checkbox */
.mark {
    position: absolute;
    top: 30px;
    left: 0;
    height: 1px;
    width: 9px;
    border-radius: 50%;
}

.container:hover input ~ .mark {
  background-color: #fff;
  color: #61B058;
}

.container input:checked ~ .mark {
  border: 1px solid #61B058;
}

/* Create the mark/indicator (hidden when not checked) */
.mark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the mark when checked */
.container input:checked ~ .mark:after {
  display: block;
}

/* Style the mark/indicator */
.container .mark:after {
  left: 6px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid #61B058;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
.completed-span{
  border: none!important;
}
</style>