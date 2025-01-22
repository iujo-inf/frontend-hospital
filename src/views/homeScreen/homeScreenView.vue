<template>
  <div class="loguin">
    <BaseLayout page-title="Inicio">
      <DataGridhomeScreen /> <!-- Este es el componente hijo que se pasará al slot -->
    </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DataGridhomeScreen from '@/components/utils/user/homeScreen/DataGridhomeScreen.vue';

@Options({
  components: {
    DataGridhomeScreen, // Asegúrate de registrar el componente aquí
  },
})
export default class homeScreenView extends Vue {}
</script>

<style scoped>

</style>