<template>
  <div class="container mt-5">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control search-bar"
        placeholder="Buscar"
        v-model="searchQuery"
      />
      <button class="btn btn-primary" @click="addAnalysisRequest">Agregar Solicitud de Análisis</button>
    </div>

    <div class="table-container">
      <table class="table table-hover analysis-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Citas</th>
            <th>Emergencia</th>
            <th>Farmacia</th>
            <th>Laboratorio</th>
            <th>Almacén</th>
            <th>Compras</th>
            <th>Ventas</th>
            <th>Facturación</th>
            <th>Finanzas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="analysisRequest in filteredAnalysisRequests" :key="analysisRequest.id">
            <td>{{ analysisRequest.user }}</td>
            <td>{{ analysisRequest.appointments }}</td>
            <td>{{ analysisRequest.emergency }}</td>
            <td>{{ analysisRequest.pharmacy }}</td>
            <td>{{ analysisRequest.laboratory }}</td>
            <td>{{ analysisRequest.warehouse }}</td>
            <td>{{ analysisRequest.purchases }}</td>
            <td>{{ analysisRequest.sales }}</td>
            <td>{{ analysisRequest.billing }}</td>
            <td>{{ analysisRequest.finance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabAnalysisList",
  data() {
    return {
      searchQuery: "",
      analysisRequests: [
        {
          id: 1,
          user: "Débora Mayurel",
          appointments: "Cita 1",
          emergency: "Emergencia A",
          pharmacy: "Medicamento X",
          laboratory: "Análisis Y",
          warehouse: "Insumo Z",
          purchases: "Compra 1",
          sales: "Venta 2",
          billing: "Factura 3",
          finance: "Finanza 4",
        },
        // Add more analysis requests if needed
      ],
    };
  },
  computed: {
    filteredAnalysisRequests() {
      return this.analysisRequests.filter((analysisRequest) => {
        const searchString = `${analysisRequest.user} ${analysisRequest.appointments} ${analysisRequest.emergency} ${analysisRequest.pharmacy} ${analysisRequest.laboratory} ${analysisRequest.warehouse} ${analysisRequest.purchases} ${analysisRequest.sales} ${analysisRequest.billing} ${analysisRequest.finance}`.toLowerCase();
        return searchString.includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    addAnalysisRequest() {
      // Redirect to form route for adding analysis requests
      this.$router.push({ path: "/agregar-solicitud-analisis" });
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

.analysis-table {
  width: 100%;
  border-collapse: collapse;
}

.analysis-table thead {
  background: #f8fafc;
  color: #333;
}

.analysis-table th,
.analysis-table td {
  padding: 12px 15px;
  text-align: left;
}

.analysis-table tbody tr:hover {
  background: #f1f4f9;
}

/* Botón de agregar análisis */
.btn-primary {
  background: #0d6efd;
  color: white;
  border-radius: 5px;
}

.btn-primary:hover {
  background: #0b5ed7;
}
</style>