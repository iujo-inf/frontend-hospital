<template>
    <div class="BillingEmergenciesList">
        <BaseLayout page-title="Emergencias > Facturación">
            <DataGridBillingEmergencies /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridBillingEmergencies from '@/components/utils/BillingEmergencies/DataGridBillingEmergencies.vue';

@Options({
    components: {
        BaseLayout,
        DataGridBillingEmergencies, // Asegúrate de registrar el componente aquí
    },
})
export default class BillingEmergenciesListView extends Vue { }
</script>

<style scoped></style>



