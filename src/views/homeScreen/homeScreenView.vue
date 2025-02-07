<template>
  <div>
    <AuthLogin> <!-- Corrected opening tag -->
      <DataGridhomeScreen /> <!-- Este es el componente hijo que se pasará al slot -->
    </AuthLogin> <!-- Corrected closing tag -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DataGridhomeScreen from '@/components/utils/homeScreen/DataGridhomeScreen.vue';
import AuthLogin from '@/components/layouts/AuthLogin.vue';

@Options({
  components: {
    DataGridhomeScreen,
    AuthLogin, // Asegúrate de registrar el componente aquí
  },
})
export default class homeScreenView extends Vue {}
</script>

<style scoped>

</style>