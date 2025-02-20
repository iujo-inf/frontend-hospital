<template>
  <div class="UserListPatient">
    <BaseLayout page-title="Listado de Pacientes">
      <DataGridPatient />
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BaseLayout from "@/components/layouts/BaseLayout.vue";
import DataGridPatient from '@/components/utils/user/patient/DataGridPatient.vue';
import authGuard from '@/mixins/authGuard'


@Options({
  components: {
    BaseLayout,
    DataGridPatient,
  },
  mixins: [authGuard],
})
export default class UserListPatientView extends Vue {}
</script> 