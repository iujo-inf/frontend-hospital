<template>
  <div class="container mt-5">
    <!-- Barra de búsqueda y botón de agregar con mismo ancho -->
    <div class="d-flex mb-3">
      <input type="text" class="form-control flex-grow-1" placeholder="Buscar por nombre" v-model="searchQuery" />
      <button class="btn btn-primary flex-grow-1 ms-3" @click="showForm = true" v-if="!showForm">Agregar producto</button>
    </div>

    <!-- Tabla de productos -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Estado</th>
          <th>Detalle</th>
          <th>Peso</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.status }}</td>
          <td>{{ product.detail }}</td>
          <td>{{ product.weight }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editProduct(product.id)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Agregar Producto -->
    <div v-if="showForm" class="modal-overlay" @click.self="cancelar">
      <div class="modal-content">
        <h2>Agregar Producto</h2>
        <form @submit.prevent="guardarProducto" class="form">
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" v-model="nuevoProducto.nombre" required />

          <label for="descripcion">Descripción</label>
          <input type="text" id="descripcion" v-model="nuevoProducto.descripcion" required />

          <label for="cantidad">Cantidad</label>
          <input type="number" id="cantidad" v-model="nuevoProducto.cantidad" required />

          <label for="peso">Peso</label>
          <input type="number" id="peso" v-model="nuevoProducto.peso" required />

          <label for="ubicacion">Ubicación</label>
          <input type="text" id="ubicacion" v-model="nuevoProducto.ubicacion" required />

          <label for="precio">Precio</label>
          <input type="number" id="precio" v-model="nuevoProducto.precio" required />

          <div class="buttons">
            <button type="button" class="cancelar" @click="cancelar">Cancelar</button>
            <button type="submit" class="guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      showForm: false,  
      nuevoProducto: {
        nombre: '',
        descripcion: '',
        cantidad: '',
        peso: '',
        ubicacion: '',
        precio: '',
      },
      products: [
        { id: 1, status: 'Procesado', detail: 'Ibuprofeno', weight: '200 gr', amount: 40, price: 110.1 },
        { id: 2, status: 'Procesado', detail: 'Acetaminofén', weight: '500 gr', amount: 220, price: 90 },
      ],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const fullDetail = `${product.status} ${product.detail}`.toLowerCase();
        return fullDetail.includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    guardarProducto() {
      const newProduct = {
        id: this.products.length + 1,
        ...this.nuevoProducto,
      };
      this.products.push(newProduct);
      this.showForm = false;
      this.resetForm();
    },
    cancelar() {
      this.showForm = false;
      this.resetForm();
    },
    resetForm() {
      this.nuevoProducto = {
        nombre: '',
        descripcion: '',
        cantidad: '',
        peso: '',
        ubicacion: '',
        precio: '',
      };
    },
    editProduct(id) {
      alert(`Editar producto con ID: ${id}`);
    },
    deleteProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
      alert(`Producto con ID: ${id} eliminado`);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  font-weight: bold;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cancelar {
  background-color: #e0e0e0;
}

.cancelar:hover {
  background-color: #bdbdbd;
}

.guardar {
  background-color: #4caf50;
  color: white;
}

.guardar:hover {
  background-color: #45a049;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilo para la barra de búsqueda y el botón con el mismo ancho */
.d-flex {
  display: flex;
  align-items: center;
}

.flex-grow-1 {
  flex-grow: 1;
}

.ms-3 {
  margin-left: 1rem; 
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>








