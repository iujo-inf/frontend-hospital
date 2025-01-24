<template>
    <div class="BillingLaboratoriesList">
        <BaseLayout page-title="Laboratorio > Facturación">
            <DataGridBillingLaboratories /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridBillingLaboratories from '@/components/utils/BillingLaboratories/DataGridBillingLaboratories.vue';

@Options({
    components: {
        BaseLayout,
        DataGridBillingLaboratories, // Asegúrate de registrar el componente aquí
    },
})
export default class BillingLaboratoriesListView extends Vue { }
</script>

<style scoped></style>



