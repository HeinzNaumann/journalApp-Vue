<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold"> {{ dayMonthYear.day }}</span>
        <span class="mx-1 fs-3"> {{ dayMonthYear.month }}</span>
        <span class="fs-4 fw-light"> {{ dayMonthYear.yearDay }}</span>
      </div>

      <div>

        <input type="file"
              @change="onSelectedImage"
              ref="imageSelector"
              v-show="false"
              accept="image/png, image/jpeg"
        />

        <button
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="onDeleteEntry"
        >
          Borrar,
          <li class="fa fa-trash-alt"></li>
        </button>
        <button class="btn btn-primary mx-2" @click="onSelectImage">
          Subir foto
          <li class="fa fa-upload"></li>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Que sucedio hoy?" v-model="entry.text">
      </textarea>
    </div>
    <FabVue icon="fa-save" @on:click="saveEntry" />
    <!-- <img
      src="https://st1.uvnimg.com/dims4/default/0fefa39/2147483647/thumbnail/1024x576%3E/quality/75/?url=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fimj%2Fa%2Famazonas-afluentes.jpg"
      class="img-thumbnail"
      alt="amazonas"
    /> -->
    <img
      v-if="localImage"
      :src="localImage"
      class="img-thumbnail"
      alt="amazonas"
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import Swal from "sweetalert2";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    FabVue: defineAsyncComponent(() => import("../components/FabVue.vue")),
  },

  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    };
  },

  computed: {
    ...mapGetters("journal", ["getEntryById"]),

    dayMonthYear() {
      const { day, month, yearDay } = getDayMonthYear(this.entry.date);
      return { day, month, yearDay };
    },
  },

  methods: {
    loadEntry() {
      let entry;

      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },

    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),

    async saveEntry() {
      new Swal({
        title: "Espere por favor",
        allowOutsideClick: false,
      });
      Swal.showLoading();
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);

        this.$router.push({ name: "entry", params: { id } });
      }

      Swal.fire({
        title: "Guardado",
        text: "Nota guardada con exito",
        icon: "success",
        confirmButtonText: "Cool",
      });
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Esta seguro?",
        text: "Una vez borrado, no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });
      if (isConfirmed) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()
        await this.deleteEntry(this.id);
        this.$router.push({ name: "no-entry" });

        Swal.fire('Eliminado','','success' )
      }
     
    },

    onSelectedImage(event){
      const file = event.target.files[0]
      if (!file){
        this.localImage = null
        this.file = null
        return
      }

      this.file = file
      
      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL( file )

    },

      onSelectImage (){
      this.$refs.imageSelector.click()
    }
  },

  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
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
