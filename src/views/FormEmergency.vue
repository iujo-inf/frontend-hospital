<template>
    <div class="FormEmergency">
        <BaseLayout page-title="Emergencias > Agregar Emergencia">
            <FormEmergency /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import FormEmergency from '@/components/utils/emergency/FormEmergency.vue'; // Asegúrate de que la ruta de importación sea correcta

@Options({
    components: {
        BaseLayout,
        FormEmergency, // Asegúrate de registrar el componente aquí
    },
})
export default class FormEmergencyView extends Vue { }
</script>

<style scoped></style>
