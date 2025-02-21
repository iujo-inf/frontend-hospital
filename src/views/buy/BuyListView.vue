<template>
    <div class="BuyList">
        <BaseLayout page-title="Solicitar Compras">
            <DataGridBuy />
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridBuy from '@/components/utils/buy/DataGridBuy.vue';
import authGuard from '@/mixins/authGuard';

@Options({
    components: {
        BaseLayout,
        DataGridBuy,
    },
    mixins: [authGuard],
})
export default class BuyListView extends Vue { }
</script>

<style scoped></style>