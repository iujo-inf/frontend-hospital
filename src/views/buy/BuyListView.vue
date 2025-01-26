<template>
    <div class="BuyList">
        <BaseLayout page-title="Compras">
            <DataGridBuy />
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridBuy from '@/components/utils/buy/DataGridBuy.vue';

@Options({
    components: {
        BaseLayout,
        DataGridBuy,
    },
})
export default class BuyListView extends Vue { }
</script>

<style scoped></style>
