<template>
  <div class="ListQuote">
    <BaseLayout page-title="Citas">
      <DataGridQuote /> <!-- Este es el componente hijo que se pasará al slot -->
    </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridQuote from '@/components/utils/quote/DataGridQuote.vue';

@Options({
  components: {
    BaseLayout,
    DataGridQuote, // Asegúrate de registrar el componente aquí
  },
})
export default class quoteListView extends Vue {}
</script>

<style scoped>

</style>