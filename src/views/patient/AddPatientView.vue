<template>
    <div class="FormPatient">
        <BaseLayout page-title="Listado de Usuarios > Pacientes > Registra paciente">
            <FormPatient /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import FormPatient from '@/components/utils/patient/FormPatient.vue';

@Options({
    components: {
        BaseLayout,
        FormPatient, // Asegúrate de registrar el componente aquí
    },
})
export default class FormPatientView extends Vue { }
</script>

<style scoped></style>

