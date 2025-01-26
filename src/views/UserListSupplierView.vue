<template>
    <div class="SupplierList">
        <BaseLayout page-title="Listado de Usuarios > Proveedores">
            <DataGridSupplier />
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridSupplier from '@/components/utils/user/supplier/DataGridSupplier.vue';

@Options({
    components: {
        BaseLayout,
        DataGridSupplier,
    },
})
export default class SupplierListView extends Vue { }
</script>

<style scoped></style>