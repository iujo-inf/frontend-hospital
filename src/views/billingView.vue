<template>
    <div class="Finance">
      <BaseLayout page-title="Resumen de Cuenta">
        <DataGridBilling />
      </BaseLayout>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import BaseLayout from "@/components/layouts/BaseLayout.vue";
  import DataGridFinance from "@/components/utils/Billing/DataGridBilling.vue"; // Importante: ruta correcta
  
  @Options({
    components: {
      BaseLayout,
      DataGridBilling,
    },
  })
  export default class BillingView extends Vue {}
  </script>
  
  <style scoped>
  
  </style>