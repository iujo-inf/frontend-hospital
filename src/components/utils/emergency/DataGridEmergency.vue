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
          <button class="btn btn-primary" @click="addEmergency">Agregar Emergencia</button>
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
                          <span class="actions-icon">•••</span>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  name: "DataGridEmergencyList",
  data() {
      return {
          searchQuery: "",
          emergencies: [
              {
                  id: 1,
                  patient: "Débora Mayurel",
                  doctor: "Miguel Gutierrez",
                  details: "Miguel Gutierrez",
                  date: "02/11/2024 20:45",
                  result: "-",
              },
              // Agrega más emergencias si es necesario
          ],
      };
  },
  computed: {
      filteredEmergencies() {
          return this.emergencies.filter((emergency) => {
              const searchString = `${emergency.patient} ${emergency.doctor} ${emergency.details}`.toLowerCase();
              return searchString.includes(this.searchQuery.toLowerCase());
          });
      },
  },
  methods: {
      addEmergency() {
          this.$router.push({ path: '/agregar-emergencia' }); // Redirige a la ruta del formulario
      },
  },
};
</script>

<style scoped>
/* Estilos generales */
.container {
  max-width: 1200px;
  margin: auto;
}

/* Barra de búsqueda */
.search-bar {
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
}

/* Tabla */
.table-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.emergency-table {
  width: 100%;
  border-collapse: collapse;
}

.emergency-table thead {
  background: #f8fafc;
  color: #333;
}

.emergency-table th,
.emergency-table td {
  padding: 12px 15px;
  text-align: left;
}

.emergency-table tbody tr:hover {
  background: #f1f4f9;
}

.emergency-table .actions-icon {
  color: #888;
  font-size: 20px;
  cursor: pointer;
}

.emergency-table .actions-icon:hover {
  color: #555;
}

/* Botón de agregar emergencia */
.btn-primary {
  background: #0d6efd;
  color: white;
  border-radius: 5px;
}

.btn-primary:hover {
  background: #0b5ed7;
}
</style>
