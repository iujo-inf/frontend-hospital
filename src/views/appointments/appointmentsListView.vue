<template>
  <div class="ListAppointments">
    <BaseLayout page-title="Citas">
      <DataGridAppointments /> <!-- Este es el componente hijo que se pasará al slot -->
    </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridAppointments from '@/components/utils/appointments/DataGridAppointments.vue';

@Options({
  components: {
    BaseLayout,
    DataGridAppointments, // Asegúrate de registrar el componente aquí
  },
})
export default class AppointmentsListView extends Vue {}
</script>

<style scoped>

</style>