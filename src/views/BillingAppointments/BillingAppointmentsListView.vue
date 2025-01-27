<template>
    <div class="BillingAppointmentsList">
        <BaseLayout page-title="Citas > Facturación">
            <DataGridBillingAppointments /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridBillingAppointments from '@/components/utils/BillingAppointments/DataGridBillingAppointments.vue';

@Options({
    components: {
        BaseLayout,
        DataGridBillingAppointments, // Asegúrate de registrar el componente aquí
    },
})
export default class BillingAppointmentsListView extends Vue { }
</script>

<style scoped></style>



