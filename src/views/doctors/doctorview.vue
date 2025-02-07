<template>
    <div class="doctorview">
        <BaseLayout page-title="Emergencias > Facturación">
            <AddDoctor /> <!-- Este es el componente hijo que se pasará al slot -->
        </BaseLayout> <!-- Asegúrate de que este componente esté en el template -->
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import AddDoctor from '@/components/utils/user/doctors/AddDoctor.vue';

@Options({
    components: {
        BaseLayout,
        AddDoctor, // Asegúrate de registrar el componente aquí
    },
})
export default class doctorView extends Vue { }
</script>

<style scoped></style>


