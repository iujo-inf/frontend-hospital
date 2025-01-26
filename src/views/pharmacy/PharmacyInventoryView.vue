<template>
  <div class="PharmacyInventory">
    <BaseLayout page-title="Listado de Medicamentos > Inventario">
      <DataGridMedicine />
      <!-- Este es el componente hijo que se pasará al slot -->
    </BaseLayout>
    <!-- Usa BaseLayout como estructura principal -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BaseLayout from "@/components/layouts/BaseLayout.vue";
import DataGridMedicine from "@/components/utils/pharmacy/DataGridMedicine.vue"; // Asegúrate de crear y registrar este componente

@Options({
  components: {
    BaseLayout,
    DataGridMedicine, // Registrar componente para mostrar el inventario
  },
})
export default class PharmacyInventoryView extends Vue {}
</script>

<style scoped>
/* ... otros estilos ... */

.dropdown-menu {
  min-width: 160px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border: 1px solid #f5f9fb;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  color: #333;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.text-danger:hover {
  background-color: #fff5f5;
}

.btn-link {
  color: #333;
}

.btn-link:hover {
  color: #2d60ff;
}
</style>

