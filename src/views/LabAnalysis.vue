// LabAnalysisListView.vue
<template>
  <div class="LabAnalysisListView">
    <BaseLayout page-title="Laboratorio">
      <DataGridLabAnalysis />
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridLabAnalysis from '@/components/utils/Laboratory/DataGridLabAnalysis.vue';

@Options({
  components: {
    BaseLayout,
    DataGridLabAnalysis,
  },
})
export default class LabAnalysisListView extends Vue { }
</script>

<style scoped></style>

// DataGridLabAnalysis.vue
<template>
  <div class="data-grid-lab-analysis">
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
            <th>Estado</th>
            <th>Detalle</th>
            <th>Peso</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="analysis in filteredAnalyses" :key="analysis.id">
            <td>{{ analysis.estado }}</td>
            <td>{{ analysis.detalle }}</td>
            <td>{{ analysis.peso }}</td>
            <td>{{ analysis.cantidad }}</td>
            <td>{{ analysis.precio }}</td>
            <td>
              <span class="actions-icon">•••</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

interface Analysis {
  id: number;
  estado: string;
  detalle: string;
  peso: string;
  cantidad: string;
  precio: string;
}

@Options({
  data() {
    return {
      searchQuery: "",
      analyses: [
        {
          id: 1,
          estado: "Procesado",
          detalle: "Muestra de Sangre",
          peso: "200 grs",
          cantidad: "1",
          precio: "50.00$",
        },
        // ... more analysis data
      ] as Analysis[],
    };
  },
  computed: {
    filteredAnalyses(): Analysis[] {
      return this.analyses.filter((analysis) => {
        const searchString = `${analysis.estado} ${analysis.detalle} ${analysis.peso} ${analysis.cantidad} ${analysis.precio}`.toLowerCase();
        return searchString.includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    addAnalysisRequest() {
      this.$router.push({ path: '/agregar-solicitud-analisis' });
    },
  },
})
export default class DataGridLabAnalysis extends Vue { }
</script>

<style scoped>
/* ... (same styles as before) */
</style>