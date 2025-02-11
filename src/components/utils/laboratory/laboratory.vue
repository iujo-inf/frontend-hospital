<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar"
        v-model="searchQuery"
      />
      <button class="btn btn-primary add-product-btn" @click="showModal = true">
        Agregar Solicitud de Análisis
      </button>
    </div>
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
        <tr v-for="item in filteredItems" :key="item.id">
          <td>
            <span :class="['status-oval', item.estado === 'Procesando' ? 'processing' : 'otro-estado']">
              {{ item.estado }}
            </span>
          </td>
          <td>{{ item.detalle }}</td>
          <td>{{ item.peso }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ formatCurrency(item.precio) }}</td>
          <td>
             <button class="btn btn-primary btn-sm" @click="editItem(item)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="deleteItem(item)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Solicitud de Análisis</h5>
          <button type="button" class="close close-btn" @click="showModal = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveItem">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Detalle</label>
                <input type="text" class="form-control" placeholder="Detalle" v-model="newItem.detalle" required />
              </div>
              <div class="form-group col-md-6">
                <label>Peso</label>
                <input type="text" class="form-control" placeholder="Peso" v-model="newItem.peso" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Cantidad</label>
                <input type="number" class="form-control" placeholder="Cantidad" v-model="newItem.cantidad" required />
              </div>
              <div class="form-group col-md-6">
                <label>Precio</label>
                <input type="text" class="form-control" placeholder="Precio" v-model="newItem.precio" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      showModal: false,
      newItem: {
        detalle: "",
        peso: "",
        cantidad: null,
        precio: null,
        estado: "Procesando" // Valor por defecto
      },
      items: [
        { id: 1, estado: "Procesando", detalle: "Ibuprofeno", peso: "200 grs", cantidad: 40, precio: 110.00 },
       
      ],
      nextId: 2 // Para generar IDs únicos
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item =>
        item.detalle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    formatCurrency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    },
    editItem(item) {
      // Lógica para editar el item (abrir modal, etc.)
      console.log("Editar:", item);
    },
    deleteItem(item) {
      if (confirm(`¿Estás seguro de eliminar ${item.detalle}?`)) {
        this.items = this.items.filter(i => i.id !== item.id);
      }
    },
    saveItem() {
      if (this.newItem.detalle && this.newItem.cantidad && this.newItem.peso && this.newItem.precio) {
          this.items.push({
            id: this.nextId++,
            estado: "Procesando",
            detalle: this.newItem.detalle,
            peso: this.newItem.peso,
            cantidad: parseInt(this.newItem.cantidad), // Convertir a número
            precio: parseFloat(this.newItem.precio)  // Convertir a float
          });
          this.resetForm();
          this.showModal = false;
        } else {
          alert("Por favor, completa todos los campos.");
        }
    },
    resetForm() {
      this.newItem = {
        detalle: "",
        peso: "",
        cantidad: null,
        precio: null,
        estado: "Procesando"
      };
    }
  }
};
</script>

<style scoped>
/* ... (estilos existentes) */
.status-oval.processing {
  border: 2px solid orange;
  background-color: white;
  color: orange;
}
</style>