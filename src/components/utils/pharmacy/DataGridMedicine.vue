<template>
  <div class="container mt-5">
    <input
      type="text"
      class="form-control mb-3"
      placeholder="Buscar por nombre de medicamento"
      v-model="searchQuery"
    />
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
            <button class="btn btn-primary btn-sm mr-2" @click="editMedicine(med.id)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="deleteMedicine(med.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataGridMedicine',
  data() {
    return {
      searchQuery: '',
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
      ],
    };
  },
  computed: {
    filteredMedicines() {
      return this.medicines.filter(med => {
        return med.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    formatCurrency(value) {
      return `$${parseFloat(value).toFixed(2)}`; // Método para formatear el precio
    },
    editMedicine(id) {
      alert(`Editar medicamento con ID: ${id}`);
      // Agregar lógica para editar el medicamento
    },
    deleteMedicine(id) {
      const confirmDelete = confirm(`¿Estás seguro de eliminar el medicamento con ID: ${id}?`);
      if (confirmDelete) {
        this.medicines = this.medicines.filter(med => med.id !== id);
      }
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}

/* Estilo para la parte de estado :) */
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

/* Espaciado entre los botones Editar eliminar */
.btn-sm {
  margin-right: 10px;
}
</style>
