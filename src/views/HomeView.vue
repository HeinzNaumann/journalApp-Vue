<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hola Mundo</h1>
    <button @click="gotToDayBook" class="btn btn-primary">Primary</button>
    <button @click="gotToDayBook" class="btn btn-secondary">Secondary</button>
    <button @click="gotToDayBook" class="btn btn-success">Success</button>
  </div>
</template>


<script>

  export default {
    methods: {
      gotToDayBook(){
        this.$router.push({name: 'daybook'})
      }
    }
  }


</script>