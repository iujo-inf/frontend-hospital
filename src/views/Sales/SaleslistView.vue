<template>
    <div class="SalesList">
        <BaseLayout page-title="Ventas">
            <DataGridSales />
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridSales from '@/components/utils/Sales/DataGridSales.vue';

@Options({
    components: {
        BaseLayout,
        DataGridSales,
    },
})
export default class SalesListView extends Vue { }
</script>

<style scoped></style>
