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
    </div>

    <!-- Tabla de doctores -->
    <div class="table-container">
      <table class="table table-hover doctors-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cédula</th>
            <th>Fecha de Nacimiento</th>
            <th>Sexo</th>
            <th>Nro de Teléfono</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in filteredDoctors" :key="doctor.cedula">
            <td>{{ doctor.first_name }}</td>
            <td>{{ doctor.last_name }}</td>
            <td>{{ doctor.cedula }}</td>
            <td>{{ doctor.birth_date }}</td>
            <td>{{ doctor.gender }}</td>
            <td>{{ doctor.phone_number }}</td>
            <td>{{ doctor.city }}</td>
            <td>{{ doctor.state }}</td>
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
  name: "DoctorsTable",
  data() {
    return {
      searchQuery: "",
      doctors: [
        {
          first_name: "cristian",
          last_name: "gomez",
          cedula: "1234468",
          birth_date: "07/02/02",
          gender: "masculino",
          phone_number: "123578",
          city: "acarigua",
          state: "1",
        },
      ],
    };
  },
  computed: {
    filteredDoctors() {
      return this.doctors.filter((doctor) => {
        const searchString = `${doctor.first_name} ${doctor.last_name} ${doctor.cedula}`.toLowerCase();
        return searchString.includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}

.search-bar {
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
}

.table-container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.doctors-table {
  width: 100%;
  border-collapse: collapse;
}

.doctors-table thead {
  background: #f8fafc;
  color: #333;
}

.doctors-table th,
.doctors-table td {
  padding: 12px 15px;
  text-align: left;
}

.doctors-table tbody tr:hover {
  background: #f1f4f9;
}

.doctors-table .actions-icon {
  color: #888;
  font-size: 20px;
  cursor: pointer;
}

.doctors-table .actions-icon:hover {
  color: #555;
}
</style>
