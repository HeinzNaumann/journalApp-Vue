<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
     
  </div>
 <fabVue 
      @on:click="createNewEntry"
      icon=" fa fa-2x fa-plus"/>
</template>

<script>
    import { defineAsyncComponent } from 'vue';

export default {
  components: {
     FabVue: defineAsyncComponent(()=> import('../components/FabVue.vue'))
  },
  methods: {
      createNewEntry() {
        this.$router.push({name: 'entry', params: {id: 'new'}})
      }
  }
}
</script>

<style lang="scss" scoped>
div{
    height: 100%;
}

</style>