<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar Entrada" />
    </div>
    <div class="entry-scrollarea">
    <EntrySingle v-for="item in 100 " :key="item">Entry</EntrySingle>
    
  </div>
  </div>

  
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {
    components:{
        EntrySingle: defineAsyncComponent(()=> import("./EntrySingle.vue"))
    }
};
</script>

<style lang="scss" scoped>

input{
    height:55px;
    margin-bottom: 10px;
}

.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
}

.entry-scrollarea{
    height: calc(100vh - 110px);
    overflow: scroll;
}
</style>