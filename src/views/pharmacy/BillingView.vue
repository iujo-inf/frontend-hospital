<template>
    <div class="DataGridbilling">
        <BaseLayout page-title="Farmacia > Facturación">
            <DataGridbilling /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> 
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridbilling from '@/components/utils/pharmacy/DataGridbilling.vue';

@Options({
    components: {
        BaseLayout,
        DataGridbilling, 
    },
})
export default class BillingView extends Vue { }
</script>

<style scoped></style>