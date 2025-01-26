<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar por nombre de medicamento"
        v-model="searchQuery"
      />
      <button class="btn btn-primary add-product-btn" @click="showModal = true">
        <span class="">Ingresar producto</span>
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Estado</th>
          <th>Nombre</th>
          <th>Peso</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="med in filteredMedicines" :key="med.id">
          <td>
            <span :class="['status-oval', med.state === 'Disponible' ? 'available' : 'out-of-stock']">
              {{ med.state }}
            </span>
          </td>
          <td>{{ med.name }}</td>
          <td>{{ med.weight }} kg</td>
          <td>{{ med.stock }}</td>
          <td>{{ formatCurrency(med.price) }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="editMedicine(med.id)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="deleteMedicine(med.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Producto</h5>
            <button
    type="button"
    class="close close-btn"
    @click="showModal = false"
  >
    &times;
  </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Nombre</label>
                <input type="text" class="form-control" placeholder="Nombre" v-model="newProduct.name" />
              </div>
              <div class="form-group col-md-6">
                <label>Descripción</label>
                <input type="text" class="form-control" placeholder="Descripción" v-model="newProduct.description" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Cantidad</label>
                <input type="number" class="form-control" placeholder="Cantidad" v-model="newProduct.quantity" />
              </div>
              <div class="form-group col-md-6">
                <label>Peso</label>
                <input type="text" class="form-control" placeholder="Peso" v-model="newProduct.weight" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Ubicación</label>
                <input type="text" class="form-control" placeholder="Ubicación" v-model="newProduct.location" />
              </div>
              <div class="form-group col-md-6">
                <label>Precio</label>
                <input type="text" class="form-control" placeholder="Precio" v-model="newProduct.price" />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showModal = false">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="saveProduct">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataGridMedicine',
  data() {
    return {
      searchQuery: '',
      showModal: false,
      newProduct: {
        name: '',
        description: '',
        quantity: null,
        weight: null,
        location: '',
        price: null,
      },
      medicines: [
        { id: 1, name: 'Paracetamol', state: 'Disponible', weight: 0.05, stock: 100, price: 1.2 },
         { id: 2, name: 'Ibuprofeno', state: 'Disponible', weight: 0.07, stock: 50, price: 2.5 },
        { id: 3, name: 'Omeprazol', state: 'Disponible', weight: 0.04, stock: 80, price: 3.0 },
        { id: 4, name: 'Amoxicilina', state: 'Agotado', weight: 0.03, stock: 0, price: 1.8 },
        { id: 5, name: 'Loratadina', state: 'Disponible', weight: 0.02, stock: 60, price: 1.5 },
        { id: 6, name: 'Cetirizina', state: 'Disponible', weight: 0.05, stock: 120, price: 1.3 },
        { id: 7, name: 'Claritromicina', state: 'Disponible', weight: 0.08, stock: 200, price: 4.0 },
        { id: 8, name: 'Ranitidina', state: 'Disponible', weight: 0.03, stock: 85, price: 1.9 },
        { id: 9, name: 'Ciproflaxacino', state: 'Agotado', weight: 0.12, stock: 0, price: 2.8 },
        { id: 10, name: 'Fexofenadina', state: 'Disponible', weight: 0.06, stock: 150, price: 2.0 },
        { id: 11, name: 'Loperamida', state: 'Disponible', weight: 0.02, stock: 95, price: 1.6 },
        { id: 12, name: 'Dextrometorfano', state: 'Disponible', weight: 0.04, stock: 110, price: 1.7 },
        { id: 13, name: 'Metformina', state: 'Disponible', weight: 0.04, stock: 180, price: 2.2 },
        { id: 14, name: 'Simvastatina', state: 'Disponible', weight: 0.03, stock: 130, price: 2.6 },
        { id: 15, name: 'Levotiroxina', state: 'Agotado', weight: 0.01, stock: 0, price: 3.3 },
        { id: 16, name: 'Amlodipina', state: 'Disponible', weight: 0.07, stock: 50, price: 2.9 },
        { id: 17, name: 'Atorvastatina', state: 'Disponible', weight: 0.06, stock: 75, price: 3.5 },
        { id: 18, name: 'Fluoxetina', state: 'Disponible', weight: 0.05, stock: 65, price: 2.7 },
        { id: 19, name: 'Acetaminofén', state: 'Disponible', weight: 0.04, stock: 90, price: 1.0 },
        { id: 20, name: 'Escitalopram', state: 'Agotado', weight: 0.03, stock: 0, price: 3.2 },
        // Agregar datos
      ],
    };
  },
  computed: {
    filteredMedicines() {
      return this.medicines.filter((med) => med.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  methods: {
    formatCurrency(value) {
      return `$${parseFloat(value).toFixed(2)}`;
    },
    editMedicine(id) {
      alert(`Editar medicamento con ID: ${id}`);
    },
    deleteMedicine(id) {
      const confirmDelete = confirm(`¿Estás seguro de eliminar el medicamento con ID: ${id}?`);
      if (confirmDelete) {
        this.medicines = this.medicines.filter((med) => med.id !== id);
      }
    },
    saveProduct() {
      if (this.newProduct.name && this.newProduct.quantity) {
        this.medicines.push({
          id: this.medicines.length + 1,
          name: this.newProduct.name,
          description: this.newProduct.description,
          state: 'Disponible',
          weight: this.newProduct.weight || 0,
          stock: this.newProduct.quantity,
          location: this.newProduct.location,
          price: parseFloat(this.newProduct.price) || 0,
        });
        this.resetForm();
        this.showModal = false;
      } else {
        alert('Completa los campos obligatorios');
      }
    },
    resetForm() {
      this.newProduct = {
        name: '',
        description: '',
        quantity: null,
        weight: null,
        location: '',
        price: null,
      };
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.add-product-btn {
  display: inline-block; /* Asegura que sea un botón compacto */
  white-space: nowrap; /* Mantiene el texto en una sola línea */
  text-align: center; /* Centra el texto en el botón */
  padding: 10px 20px; /* Ajusta los márgenes */
  border-radius: 10px; /* Redondeo de esquinas */
  font-size: 14px; /* Tamaño de letra */
  font-weight: bold; /* Resalta el texto */
  background-color: #007bff; /* Color azul (puedes ajustarlo si necesitas) */
  color: #fff;
}

.add-product-btn:hover {
  background-color: #0056b3; /* Azul más oscuro al pasar el cursor */
  cursor: pointer;
}
.close-btn {
  color: red;
  font-size: 24px; /* Aumenta el tamaño de la fuente */
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.close-btn:hover {
  color: darkred; /* Color más oscuro al pasar el mouse */
}
.status-oval {
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}

.status-oval.available {
  border: 2px solid green;
  background-color: white;
  color: green;
}

.status-oval.out-of-stock {
  border: 2px solid red;
  background-color: white;
  color: red;
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
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
