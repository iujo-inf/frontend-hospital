<template>
    <div class="Finance">
      <BaseLayout page-title="Resumen de Cuenta">
        <DataGridFinance />
      </BaseLayout>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import BaseLayout from "@/components/layouts/BaseLayout.vue";
  import DataGridFinance from "@/components/utils/finance/DataGridFinance.vue"; // Importante: ruta correcta
  
  @Options({
    components: {
      BaseLayout,
      DataGridFinance,
    },
  })
  export default class FinanceView extends Vue {}
  </script>
  
  <style scoped>
  
  </style>