<template>
    <div class="EmergencyListView">
        <BaseLayout page-title="Emergencias">
            <DataGridEmergency /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridEmergency from '@/components/utils/emergency/DataGridEmergency.vue'; // Asegúrate de que la ruta y el nombre del archivo sean correctos

@Options({
    components: {
        BaseLayout,
        DataGridEmergency, // Asegúrate de registrar el componente aquí
    },
})
export default class EmergencyListView extends Vue { }
</script>

<style scoped></style>
