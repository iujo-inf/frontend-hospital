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

<style scoped></style>

