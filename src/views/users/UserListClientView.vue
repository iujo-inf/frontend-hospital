<template>
  <div class="UserListClient">
    <BaseLayout page-title="Listado de Clientes">
      <DataGridClient />
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BaseLayout from '@/components/layouts/BaseLayout.vue'
import DataGridClient from '@/components/utils/user/client/DataGridClient.vue'
import authGuard from '@/mixins/authGuard'

@Options({
  components: {
    BaseLayout,
    DataGridClient
  },
  mixins: [authGuard],
})
export default class UserListClientView extends Vue {}
</script> 