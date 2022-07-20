<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold"> {{dayMonthYear.day}}</span>
      <span class="mx-1 fs-3"> {{dayMonthYear.month}}</span>
      <span class="fs-4 fw-light"> {{dayMonthYear.yearDay}}</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Borrar, 
        <li class="fa fa-trash-alt"></li>
      </button>
        <button class="btn btn-primary mx-2">
        Subir foto
        <li class="fa fa-upload"></li>
      </button>
    </div>
  </div>
  <hr>
<div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿Que sucedio hoy?" v-model="entry.text">

    </textarea>
</div>
<FabVue icon="fa-save"/>
<img src="https://st1.uvnimg.com/dims4/default/0fefa39/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fimj%2Fa%2Famazonas-afluentes.jpg" class="img-thumbnail" alt="amazonas">
</template>

<script>
import { defineAsyncComponent } from 'vue';

import { mapGetters } from 'vuex'; // computed

import getDayMonthYear from '../helpers/getDayMonthYear';
export default {
    props:{
      id:{
        type: String,
        required: true,
      }
    },
    components:{
        FabVue: defineAsyncComponent(()=>import('../components/FabVue.vue'))
    },

    data(){
      return{
        entry: null
      }
    },

    computed: {
      ...mapGetters('journal', ['getEntryById']),

      dayMonthYear(){ 
        const {day, month, yearDay} = getDayMonthYear( this.entry.date)
        return {day, month, yearDay}
      }
 
    },
    
    methods: {
      loadEntry(){
        const entry = this.getEntryById(this.id)
        if( !entry) this.$router.push({name: 'no-entry'})
        this.entry = entry
      }
    },
    
    created(){
      this.loadEntry()
    }
};
</script>

<style lang="scss" scoped>

textarea{
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0 5px 10px rgba($color: #000, $alpha: 0);
}

</style>