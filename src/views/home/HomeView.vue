<template>
  <div class="home">
    <BaseLayout page-title="Inicio">
      <!-- Aquí irá el contenido del dashboard -->
      <div class="dashboard-content">
        <h2>Bienvenido al Sistema de Gestión Hospitalaria</h2>
        <!-- Aquí puedes agregar widgets, estadísticas, gráficos, etc. -->
      </div>
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
export default class HomeView extends Vue {}
</script>

<style scoped>
.dashboard-content {
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}
</style> 