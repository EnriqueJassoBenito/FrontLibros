<template>
  <div>
    <div class="color-1">
      <h1 class="texto">BIBLOTECA</h1>
    </div>

    <!-- Boton para agregar libros -->
    <div class="btn-post">
      <b-button v-b-modal.modal-1 variant="success">+</b-button>

      <b-modal id="modal-1" ref="modal" title="Registrar nuevo libro" hide-footer>
        <form inline ref="form" @change="postBooks">
          <b-form-group label="Nombre" label-for="name-input">
            <b-form-input id="name-input" v-model="postbody.nombrebook"></b-form-input>
          </b-form-group>

          <b-form-group label="Autor" label-for="autor-input">
            <b-form-input id="autor-input" v-model="postbody.autor"></b-form-input>
          </b-form-group>

          <b-form-group label="Editorial" label-for="editorial-input">
            <b-form-input id="editorial-input" v-model="postbody.editorial"></b-form-input>
          </b-form-group>

          <b-form-group label="Año" label-for="año-input">
            <b-form-input id="año-input" v-model="postbody.anio"></b-form-input>
          </b-form-group>

          <b-form-group label="Genero" label-for="genero-input">
            <b-form-input id="genero-input" v-model="postbody.genero"></b-form-input>
          </b-form-group>

          <!-- <b-form-file
            accept=".jpg, .png, .gif"
            class="mt-3"
            plain
          ></b-form-file> -->
        </form>

        <b-button class="btn-cancelar" variant="danger" @click="hideModal">Cancelar</b-button>
        <b-button class="btn-aceptar" variant="success" type="submit" @click="hideModal">Aceptar</b-button>
      </b-modal>
    </div>

    
    <!-- Cards para agregar libros -->
    <b-row>
    <b-col sm="6" md="4" lg="2" v-for="libro in libros" :key="libro.id" class="cards-1">
      <b-card :title="libro.nombrebook" >
        <b-card-text>
          <span class="text-span">Autor:</span> {{ libro.autor }}
        </b-card-text>

        <b-card-text>
          <span class="text-span">Editorial:</span> {{ libro.editorial }}
        </b-card-text>

        <b-card-text>
          <span class="text-span">Año:</span> {{ libro.anio }}
        </b-card-text>

        <b-card-text>
          <span class="text-span">Genero:</span> {{ libro.genero }}
        </b-card-text>
      </b-card>
    </b-col>
    </b-row>
    
  </div>
</template>

<script>
import axios from "../services/axios";
// import { postBooks } from "../services/axios"
export default {
  data() {
    return {
      postbody: {
        nombrebook: "",
        autor: "",
        editorial: "",
        anio: "",
        genero: "",
      },// Aquí se almacenará el cuerpo de la petición POST
      libros: [], // Aquí se almacenarán los libros que se obtengan del servidor
    };
  },
  mounted() {
    this.getAllBooks();
  },
  methods: {
    hideModal() {
      this.$refs['modal'].hide()
    },
    //boton para agregar libros
    async getAllBooks() {
      
      try {
        const response = await axios.getAllBooks();
        console.log("Respuesta del servidor:", response);
        this.libros = response;
        // console.log(this.libros);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    },
    async postBooks() {
      if (!this.postbody.nombrebook || !this.postbody.autor || !this.postbody.editorial || !this.postbody.anio || !this.postbody.genero) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
      try {
        const response = await axios.postBooks(this.postbody);
        console.log("Respuesta del servidor:", response);
        this.postbody = {
          nombrebook: "",
          autor: "",
          editorial: "",
          anio: "",
          genero: "",
        }.then((response) => {
          this.libros = response;
          this.getAllBooks();
        });
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    },
  },
};
</script>

<style scoped>
.color-1 {
  background-color: lightblue;
}

.texto {
  text-align: center;
}

.btn-post {
  text-align: right;
  --background-color: black;
}

.cards-1 {
  margin-top: 10px;
  --background-color: blanchedalmond;
}

.text-span {
  font-weight: 600;
}

.btn-aceptar {
  float: right;
  margin: 10px;
}

.btn-cancelar {
  float: right;
  margin: 10px;
}
</style>
