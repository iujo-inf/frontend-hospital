<template>
  <div class="ListUsers">
    <BaseLayout page-title="Inicio">
      <DataGridUser /> <!-- Este es el componente hijo que se pasará al slot -->
    </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridUser from '@/components/utils/user/DataGridUser.vue';
import authGuard from '@/mixins/authGuard'

@Options({
  components: {
    BaseLayout,
    DataGridUser, // Asegúrate de registrar el componente aquí
  },
  mixins: [authGuard],
})
export default class HomeView extends Vue {}
</script>

<style scoped>

</style>