// LabAnalysisRequestView.vue (Vista principal)
<template>
  <div class="LabAnalysisRequestView">
    <BaseLayout page-title="Laboratorio > Agregar Solicitud de Análisis">
      <FormLabAnalysisRequest />
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import FormLabAnalysisRequest from '@/components/utils/Laboratory/FormLabAnalysisRequest.vue';

@Options({
  components: {
    BaseLayout,
    FormLabAnalysisRequest,
  },
})
export default class LabAnalysisRequestView extends Vue { }
</script>

<style scoped></style>

// FormLabAnalysisRequest.vue (Componente del formulario)
<template>
  <div class="form-container">
    <h2>Agregar Solicitud de Análisis</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="estado">Estado</label>
          <select id="estado" v-model="formData.estado">
            <option value="Pendiente">Pendiente</option>
            <option value="Procesado">Procesado</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Completado">Completado</option>
          </select>
        </div>
        <div class="form-group">
          <label for="detalle">Detalle</label>
          <input type="text" id="detalle" v-model="formData.detalle" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="peso">Peso</label>
          <input type="number" id="peso" v-model="formData.peso">
        </div>
        <div class="form-group">
          <label for="cantidad">Cantidad</label>
          <input type="number" id="cantidad" v-model="formData.cantidad" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="precio">Precio</label>
          <input type="number" id="precio" v-model="formData.precio">
        </div>
      </div>
      <div class="form-row">
        <div class="form-buttons">
          <button type="button" class="cancel-button" @click="$router.go(-1)">Cancelar</button>
          <button type="submit" class="save-button">Guardar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

interface FormData {
  estado: string;
  detalle: string;
  peso: number | null;
  cantidad: number;
  precio: number | null;
}

@Options({
  data() {
    return {
      formData: {
        estado: 'Pendiente', // Valor por defecto
        detalle: '',
        peso: null,
        cantidad: 1,
        precio: null,
      } as FormData,
    };
  },
  methods: {
    handleSubmit() {
      // Aquí iría la lógica para guardar los datos, por ejemplo, una llamada a una API
      console.log('Datos a guardar:', this.formData);
      // Después de guardar, podrías redirigir al usuario a otra página
      this.$router.push({ path: '/laboratorio' }); // Redirige a la lista de análisis
    },
  },
})
export default class FormLabAnalysisRequest extends Vue { }
</script>

<style scoped>
/* (Los mismos estilos que antes) */
/* ... */
</style>