<template>
  <div>
    <div class="color-1">
      <h1 class="texto">BIBLOTECA</h1>
    </div>


    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class="drop-zone" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in listOne" :key="item.title" class="drag-el" draggable @dragstart="startDrag($event, item)">
              <h3>Cards</h3>
              <b-card v-for="libro in libros" :key="libro.id">{{ libro.nombrebook }}
                <b-card-text>
                  <span class="text-span">Autor:</span>{{ libro.autor }}
                </b-card-text>

                <b-card-text>
                  <span class="text-span">Editorial:</span>{{ libro.editorial }}
                </b-card-text>

                <b-card-text>
                  <span class="text-span">Año:</span>{{ libro.fecha.slice(0, 10) }}
                </b-card-text>

                <b-card-text>
                  <span class="text-span">Genero:</span>{{ libro.genero }}
                </b-card-text>
              </b-card>
            </div>
          </div>
        </b-col>

        <b-col>
          <div class="drop-zone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in listTwo" :key="item.title" class="drag-el" draggable @dragstart="startDrag($event, item)">
              <h3>Form</h3>
              <b-form inline ref="form" @change="postBooks" v-show="showElement" drop-placeholder>
                <b-form-group label="Nombre" label-for="name-input">
                  <b-form-input required id="name-input" v-model="postbody.nombrebook" ></b-form-input>
                </b-form-group>

                <b-form-group label="Autor" label-for="autor-input">
                  <b-form-input required id="autor-input" v-model="postbody.autor"></b-form-input>
                </b-form-group>

                <b-form-group label="Editorial" label-for="editorial-input">
                  <b-form-input required id="editorial-input" v-model="postbody.editorial"></b-form-input>
                </b-form-group>

                <b-form-group label="Fecha de publicación" label-for="año-input">
                  <b-form-input required type="date" id="año-input" v-model="postbody.fecha"></b-form-input>
                </b-form-group>

                <b-form-group label="Genero" label-for="genero-input">
                  <b-form-input required id="genero-input" v-model="postbody.genero"></b-form-input>
                </b-form-group>
              </b-form>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>    
  </div>
</template>

<script>
import axios from "../services/axios"
export default {
  data() {
    return {
      showElement: true,

      lastScrollPosition: 0,

      items: [
        {
          id: 1,
          title: "Item B",
          list: 1,
        },
        {
          id: 2,
          title: "Item C",
          list: 2,
        },
      ],
      libros: [],
      postbody: {
        nombrebook: "",
        autor: "",
        editorial: "",
        fecha: "",
        genero: "",
      },
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    
    this.getAllBooks();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    //Boton para agregar libros
    async getAllBooks() {
      try {
        const response = await axios.getAllBooks();

        this.libros = response;
      }catch (error) {
        console.log("Error al obtener libros: ", error);
      }
    },
    //Aqui se hace el post
    async postBooks(){
      if (!this.postbody.nombrebook || !this.postbody.autor || !this.postbody.editorial || !this.postbody.fecha || !this.postbody.genero){
        console.log("Todos los campos son obligatorios. ");
        return;
      }
      try {
        const response = await axios.postBooks(this.postbody);
        console.log("Respuesta del servidor: ", response);
        this.getAllBooks();
        
        this.postbody = {
          nombrebook: "",
          autor: "",
          editorial: "",
          anio: "",
          genero: "",
        };
        window.location.href = window.location.href;
      } catch (error) {
        console.log("Error al obtener libros: ", error);
      }finally {

      }
    },
    onScroll() {
      // Obtiene la posición actual del scroll
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      //console.log(currentScrollPosition);

      // La función abs para tener valores absolutos y se delimita con un offset o bien llamado
      // margen para que el valor de la posición sea después de desplazarce y no desde que uno se desplaza
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      // aqui determinamos si la posición es mayor a la posición anterior. Entonces, si lo es, mostramos el elemento.
      this.showElement = currentScrollPosition < this.lastScrollPosition;
      //
      this.lastScrollPosition = currentScrollPosition;
    },

    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt, list) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.items.find((item) => item.id == itemID);

      // Verificar si el elemento ya está en la lista de destino
      const existingItem = this.items.find((item) => item.id == itemID && item.list === list);
      if (existingItem) {
        return; // Si el elemento ya está en la lista de destino, no hagas nada más
      }

      // Actualizar el elemento con la nueva lista
      item.list = list;
    },

  },
  computed: {
    listOne() {
      return this.items.filter((item) => item.list === 1);
    },
    listTwo() {
      return this.items.filter((item) => item.list === 2);
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

.color-2 {
  background-color: beige;
}

.color-3 {
  background-color: azure;
}

.id-col {
  position: absolute;
}

.id-col-1 {
  position: absolute;
}

.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
</style>

<!-- <b-container class="bv-example-row">
            <b-row>
                <b-col class="id-col">
                    <div class="color-2">
                        <h3>Cards</h3>

                    </div>
                </b-col>
                <b-col class="id-col-1">
                    <div class="color-3">
                        <h3>Form</h3>

                    </div>
                </b-col>
            </b-row>
        </b-container> -->


        <!-- <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <h3>Cards</h3>
              <b-card>
                <b-card-text>
                  <span class="text-span">Autor:</span>
                </b-card-text>
    
                <b-card-text>
                  <span class="text-span">Editorial:</span>
                </b-card-text>
    
                <b-card-text>
                  <span class="text-span">Año:</span>
                </b-card-text>
    
                <b-card-text>
                  <span class="text-span">Genero:</span>
                </b-card-text>
              </b-card>
            </b-col>
    
            <b-col>
              <h3>Form</h3>
              <b-form  drop-placeholder>
                <b-form-group label="Nombre" label-for="name-input">
                  <b-form-input required id="name-input"></b-form-input>
                </b-form-group>
    
                <b-form-group label="Autor" label-for="autor-input">
                  <b-form-input required id="autor-input"></b-form-input>
                </b-form-group>
    
                <b-form-group label="Editorial" label-for="editorial-input">
                  <b-form-input required id="editorial-input"></b-form-input>
                </b-form-group>
    
                <b-form-group label="Fecha de publicación" label-for="año-input">
                  <b-form-input required type="date" id="año-input"></b-form-input>
                </b-form-group>
    
                <b-form-group label="Genero" label-for="genero-input">
                  <b-form-input required id="genero-input"></b-form-input>
                </b-form-group>
              </b-form>
            </b-col>
          </b-row>
        </b-container> -->