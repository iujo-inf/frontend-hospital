<template>
  <div class="UserListPacient">
    <BaseLayout page-title="Listado de Pacientes">
      <!-- Aquí irá el componente de la tabla de pacientes -->
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import BaseLayout from "@/components/layouts/BaseLayout.vue";

@Options({
  components: {
    BaseLayout,
  },
})
export default class UserListPacientView extends Vue {}
</script> 