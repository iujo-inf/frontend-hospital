<template>
    <div class="DataGridbilling">
        <BaseLayout page-title="Emergencias > Facturación">
            <DataGridbilling /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridbilling from '@/components/utils/pharmacy/DataGridbilling.vue';

@Options({
    components: {
        BaseLayout,
        DataGridbilling, // Asegúrate de registrar el componente aquí
    },
})
export default class BillingView extends Vue { }
</script>

<style scoped></style>