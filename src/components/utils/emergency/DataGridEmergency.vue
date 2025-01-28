<template>
  <div class="container mt-5">
    <!-- Barra de búsqueda -->
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control search-bar"
        placeholder="Buscar"
        v-model="searchQuery"
      />
      <button class="btn btn-primary" @click="openModal">Agregar Emergencia</button>
    </div>

    <!-- Tabla de emergencias -->
    <div class="table-container">
      <table class="table table-hover emergency-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Detalles</th>
            <th>Fecha</th>
            <th>Resultado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emergency in filteredEmergencies" :key="emergency.id">
            <td>{{ emergency.patient }}</td>
            <td>{{ emergency.doctor }}</td>
            <td>{{ emergency.details }}</td>
            <td>{{ emergency.date }}</td>
            <td>{{ emergency.result }}</td>
            <td>
              <button class="action-btn edit-btn" @click="editEmergency(emergency)">
                ✏️
              </button>
              <button class="action-btn delete-btn" @click="deleteEmergency(emergency.id)">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <h2>{{ isEditing ? "Editar Emergencia" : "Agregar Emergencia" }}</h2>
        <form @submit.prevent="saveEmergency">
          <!-- Fecha y hora -->
          <div class="form-row">
            <div class="form-group">
              <label for="fecha">Fecha</label>
              <input type="date" v-model="form.date" required />
            </div>
            <div class="form-group">
              <label for="hora">Hora</label>
              <input type="time" v-model="form.time" required />
            </div>
          </div>

          <!-- Datos del paciente -->
          <div class="section-title">Paciente</div>
          <div class="form-row">
            <div class="form-group">
              <label for="nombres">Nombres*</label>
              <input type="text" v-model="form.patient" required />
            </div>
            <div class="form-group">
              <label for="apellidos">Apellidos*</label>
              <input type="text" v-model="form.lastName" required />
            </div>
          </div>

          <!-- Más campos -->
          <div class="form-row">
            <div class="form-group">
              <label for="cedula">Cédula*</label>
              <input type="text" v-model="form.cedula" required />
            </div>
            <div class="form-group">
              <label for="edad">Edad</label>
              <input type="number" v-model="form.age" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="sexo">Sexo</label>
              <input type="text" v-model="form.gender" />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input type="tel" v-model="form.phone" />
            </div>
          </div>

          <!-- Datos de la emergencia -->
          <div class="section-title">Datos de la Emergencia</div>
          <div class="form-row">
            <div class="form-group">
              <label for="medico">Médico</label>
              <input type="text" v-model="form.doctor" />
            </div>
            <div class="form-group">
              <label for="detalles">Detalles</label>
              <input type="text" v-model="form.details" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="resultado">Resultado</label>
              <input type="text" v-model="form.result" />
            </div>
          </div>

          <!-- Botones -->
          <div class="form-row">
            <button type="button" class="cancel-button" @click="closeModal">
              Cancelar
            </button>
            <button type="submit" class="save-button">Guardar</button>
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
      searchQuery: "",
      emergencies: [
        {
          id: 1,
          patient: "Débora Mayurel",
          doctor: "Miguel Gutierrez",
          details: "Detalles de prueba",
          date: "02/11/2024",
          time: "20:45",
          result: "-",
        },
      ],
      showModal: false,
      isEditing: false,
      currentId: null,
      form: {
        date: "",
        time: "",
        patient: "",
        lastName: "",
        cedula: "",
        age: null,
        gender: "",
        phone: "",
        doctor: "",
        details: "",
        result: "",
      },
    };
  },
  computed: {
    filteredEmergencies() {
      return this.emergencies.filter((emergency) =>
        `${emergency.patient} ${emergency.doctor} ${emergency.details}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    openModal() {
      this.resetForm();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    saveEmergency() {
      if (this.isEditing) {
        const index = this.emergencies.findIndex((e) => e.id === this.currentId);
        if (index !== -1) this.emergencies.splice(index, 1, { ...this.form, id: this.currentId });
      } else {
        this.emergencies.push({ ...this.form, id: Date.now() });
      }
      this.closeModal();
    },
    editEmergency(emergency) {
      this.form = { ...emergency };
      this.currentId = emergency.id;
      this.isEditing = true;
      this.showModal = true;
    },
    deleteEmergency(id) {
      this.emergencies = this.emergencies.filter((e) => e.id !== id);
    },
    resetForm() {
      this.form = {
        date: "",
        time: "",
        patient: "",
        lastName: "",
        cedula: "",
        age: null,
        gender: "",
        phone: "",
        doctor: "",
        details: "",
        result: "",
      };
      this.isEditing = false;
      this.currentId = null;
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

/* Barra de búsqueda */
.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Tabla */
.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.emergency-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ddd;
}

.emergency-table th,
.emergency-table td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.emergency-table th {
  background-color: #f5f7fb;
  color: #333;
  font-weight: bold;
}

.emergency-table tr:hover {
  background-color: #f1f1f1;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.edit-btn {
  color: #007bff;
}

.delete-btn {
  color: #ff4d4d;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  padding: 20px;
  width: 500px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-container h2 {
  margin-top: 0;
  color: #333;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  margin: 20px 0 10px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-group:last-child {
  margin-right: 0;
}

label {
  font-size: 14px;
  color: #555;
}

input[type="text"],
input[type="number"],
input[type="date"],
input[type="time"],
input[type="tel"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.cancel-button {
  background: #f1f1f1;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background: #ddd;
}

.save-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background: #0056b3;
}

</style>