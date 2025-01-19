<template>
  <div class="UserList">
    <BaseLayout page-title="Listado de Usuarios > Pacientes">
      <DataGridUser /> <!-- Este es el componente hijo que se pasará al slot -->
    </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridUser from '@/components/utils/user/DataGridUser.vue';

@Options({
  components: {
    BaseLayout,
    DataGridUser, // Asegúrate de registrar el componente aquí
  },
})
export default class UserListView extends Vue {}
</script>

<style scoped>

</style>
