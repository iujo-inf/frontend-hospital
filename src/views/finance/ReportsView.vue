<template>
    <div class="DataGridbilling">
        <BaseLayout page-title="Finanzas > Reportes">
            <div class="container mt-5">
                <h5>Libro Diario, Estado de Cuenta, Balance General</h5>

                <form @submit.prevent="generateReport">
                    <div class="form-container">
                        <div>
                            <label for="time1">Fecha Desde</label>
                            <input type="date" 
                                   id="time1" 
                                   v-model="dates.startDate" 
                                   required 
                                   class="form-control input-time">
                        </div>
                        <div>
                            <label for="time2">Fecha Hasta</label>
                            <input type="date" 
                                   id="time2" 
                                   v-model="dates.endDate" 
                                   required 
                                   class="form-control input-time">
                        </div>
                        <button type="submit" class="button-time btn btn-primary" :disabled="isLoading">
                            {{ isLoading ? 'Generando...' : 'Generar Excel' }}
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout> 
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import authGuard from '@/mixins/authGuard';
import moment from 'moment';

@Options({
    components: {
        BaseLayout,
    },
    mixins: [authGuard],
})
export default class ReportsView extends Vue {
    dates = {
        startDate: '',
        endDate: '',
    };

    isLoading = false;

    async generateReport() {
        if (!this.dates.startDate || !this.dates.endDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos requeridos',
                text: 'Por favor seleccione ambas fechas'
            });
            return;
        }

        this.isLoading = true;
        try {
            const response = await axios({
                url: 'https://backend-hospital-mediplus.onrender.com/api/journal/excel',
                method: 'POST',
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                data: {
                    startDate: this.dates.startDate,
                    endDate: this.dates.endDate
                }
            });

            // Crear el blob y descargar
            const blob = new Blob([response.data], { 
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Reportes_Contables_${this.dates.startDate}_${this.dates.endDate}.xlsx`;
            link.click();
            window.URL.revokeObjectURL(url);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Reporte generado exitosamente',
                timer: 1500
            });

        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Error al generar el reporte'
            });
        } finally {
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.title {
    text-align: left;
}

.form-container {
    display: flex;
    gap: 16px;
    align-items: end;
}

.input-time {
    width: 220px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.button-time {
    width: 220px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}
</style>