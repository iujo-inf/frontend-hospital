<template>
    <div class="BuyListRequest">
        <BaseLayout page-title="Solicitudes de Compras">
            <DataGridBuyRequest />
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridBuyRequest from '@/components/utils/BuyRequest/DataGridBuyRequest.vue';

@Options({
    components: {
        BaseLayout,
        DataGridBuyRequest,
    },
})
export default class BuyListView extends Vue { }
</script>

<style scoped></style>
