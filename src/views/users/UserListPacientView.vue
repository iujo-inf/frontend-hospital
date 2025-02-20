<template>
  <div class="UserListPacient">
    <BaseLayout page-title="Listado de Pacientes">
      <!-- Aquí irá el componente de la tabla de pacientes -->
      <DataGridPatient />
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BaseLayout from "@/components/layouts/BaseLayout.vue";
import DataGridPatient from "@/components/utils/user/patients/DataGridPatient.vue";

@Options({
  components: {
    BaseLayout,
    DataGridPatient,
  },
})
export default class UserListPacientView extends Vue {}
</script> 