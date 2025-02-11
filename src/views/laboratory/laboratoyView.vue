<template>
    <div class="laboratoryView">
        <BaseLayout page-title="Emergencias > Facturación">
            <laboratoy /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import laboratory from '@/components/utils/laboratory/laboratory.vue';

@Options({
    components: {
        BaseLayout,
        laboratory, // Asegúrate de registrar el componente aquí
    },
})
export default class doctorView extends Vue { }
</script>

<style scoped></style>