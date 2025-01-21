<template>
    <div class="PatientList">
        <BaseLayout page-title="Listado de Usuarios > Pacientes > Listado de Pacientes">
            <DataGridPatient /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridPatient from '@/components/utils/patient/DataGridPatient.vue';

@Options({
    components: {
        BaseLayout,
        DataGridPatient, // Asegúrate de registrar el componente aquí
    },
})
export default class PatientListView extends Vue { }
</script>

<style scoped></style>

