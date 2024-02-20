<template>
  <div>
    <div class="color-1">
      <h1 class="texto">BIBLOTECA</h1>
    </div>
    <b-container>
      <b-row>
        <b-col>
          <b-input
            v-model="filtros.nombreAutorInput"
            type="text"
            placeholder="Ingrese nombre o autor"
          />
          <b-btn @click="buscarLibroPorNombreAutor()">
            Buscar por Nombre/Autor
          </b-btn>
        </b-col>
        <b-col>
          <b-input
            v-model="filtros.generoInput"
            type="text"
            placeholder="Ingrese género"
          />
          <b-btn @click="buscarLibroPorGenero()">Buscar por Género</b-btn>
        </b-col>
        <b-col>
          <label>Fecha inicio</label>
          <b-input v-model="filtros.fechaInicioInput" type="date" />
          <label>Fecha fin</label>
          <b-input v-model="filtros.fechaFinInput" type="date" />
          <b-btn @click="buscarLibroPorFechas()">Buscar por Fechas</b-btn>
        </b-col>
      </b-row>
    </b-container>
    <!-- Boton para agregar libros -->
    <div class="btn-post">
      <b-button v-b-modal.modal-1 variant="success">+</b-button>

      <b-modal
        id="modal-1"
        ref="modal"
        title="Registrar nuevo libro"
        hide-footer
      >
        <form inline ref="form" @change="postBooks">
          <b-form-group label="Nombre" label-for="name-input">
            <b-form-input
              required
              id="name-input"
              v-model="postbody.nombrebook"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Autor" label-for="autor-input">
            <b-form-input
              required
              id="autor-input"
              v-model="postbody.autor"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Editorial" label-for="editorial-input">
            <b-form-input
              required
              id="editorial-input"
              v-model="postbody.editorial"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Fecha de publicación" label-for="año-input">
            <b-form-input
              required
              type="date"
              id="año-input"
              v-model="postbody.fecha"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Genero" label-for="genero-input">
            <b-form-input
              required
              id="genero-input"
              v-model="postbody.genero"
            ></b-form-input>
          </b-form-group>
        </form>

        <b-button class="btn-cancelar" variant="danger" @click="hideModal"
          >Cancelar</b-button
        >
        <b-button
          class="btn-aceptar"
          variant="success"
          type="submit"
          @click="hideModal"
          >Aceptar</b-button
        >
      </b-modal>
    </div>

    <!-- Cards para agregar libros -->
    <b-row>
      <b-col
        sm="6"
        md="4"
        lg="2"
        v-for="libro in libros"
        :key="libro.id"
        class="cards-1"
      >
        <b-card :title="libro.nombrebook">
          <b-card-text>
            <span class="text-span">Autor:</span> {{ libro.autor }}
          </b-card-text>

          <b-card-text>
            <span class="text-span">Editorial:</span> {{ libro.editorial }}
          </b-card-text>

          <b-card-text>
            <span class="text-span">Año:</span> {{ libro.fecha.slice(0, 10) }}
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
        fecha: "",
        genero: "",
      }, // Aquí se almacenará el cuerpo de la petición POST
      libros: [], // Aquí se almacenarán los libros que se obtengan del servidor
      filtros: {
        nombreAutorInput: "",
        generoInput: "",
        fechaInicioInput: "",
        fechaFinInput: "",
      },
    };
  },
  mounted() {
    this.getAllBooks();
  },
  methods: {
    hideModal() {
      this.$refs["modal"].hide();
    },
    //boton para agregar libros
    async getAllBooks() {
      try {
        const response = await axios.getAllBooks();

        this.libros = response;
        console.log(this.libros);
      } catch (error) {
        console.error("Error al obtener libros:", error);
      }
    },
    async postBooks() {
      if (
        !this.postbody.nombrebook ||
        !this.postbody.autor ||
        !this.postbody.editorial ||
        !this.postbody.fecha ||
        !this.postbody.genero
      ) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
      try {
        const response = await axios.postBooks(this.postbody);
        console.log("Respuesta del servidor:", response);
        this.getAllBooks();

        // Reiniciar los valores del formulario después de la operación exitosa
        this.postbody = {
          nombrebook: "",
          autor: "",
          editorial: "",
          anio: "",
          genero: "",
        };
      } catch (error) {
        console.error("Error al obtener libros:", error);
      } finally {
        // Código que deseas ejecutar independientemente de si la solicitud es exitosa o falla
      }
    },
    //filtros
    async buscarLibroPorNombreAutor() {
      try {
        console.log(this.filtros.nombreAutorInput);
        const response = await axios.buscarLibroNombreAutor(
          this.filtros.nombreAutorInput
        );

        this.libros = response;
      } catch (error) {
        console.error("Error al buscar libros por Nombre/Autor:", error);
      }
    },

    async buscarLibroPorGenero() {
      try {
        const response = await axios.buscarLibroGenero(
          this.filtros.generoInput
        );

        this.libros = response;
      } catch (error) {
        console.error("Error al buscar libros por Género:", error);
      }
    },

    async buscarLibroPorFechas() {
      try {
        let fechaInicio = this.filtros.fechaInicioInput;
        let fechaFin = this.filtros.fechaFinInput;

        // Validación: Si solo hay una fecha, realizar búsqueda por fecha única
        if (fechaInicio && !fechaFin) {
          const response = await axios.buscarFecha(fechaInicio);
          this.libros = response;
        } else if (!fechaInicio && fechaFin) {
          const response = await axios.buscarFecha(fechaFin);
          this.libros = response;
        } else if (fechaInicio && fechaFin) {
          if (fechaInicio > fechaFin) {
            [fechaInicio, fechaFin] = [fechaFin, fechaInicio];
          }
          const response = await axios.buscarfechas(fechaInicio, fechaFin);

          this.libros = response.sort(
            (a, b) => new Date(b.fecha) - new Date(a.fecha)
          );
        } else {
          alert("Debe proporcionar al menos una fecha para busqueda específica o ambas para busqueda entre rango de fechas");
        }
      } catch (error) {
        console.error("Error al buscar libros por Fechas:", error);
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
