<template>
    <div class="DataGridbilling">
        <BaseLayout page-title="Finanzas > Reportes">
            <div class="container mt-5">
                <h5>Libro Diario, Estado de Cuenta, Balance General</h5>
                
                <!-- Información de rango de fechas -->
                <div class="date-range-info alert alert-info mb-4" v-if="dateRange.start && dateRange.end">
                    <i class="bi bi-info-circle me-2"></i>
                    <span>Registros disponibles desde: 
                        <strong>{{ formatDate(dateRange.start) }}</strong> 
                        hasta: 
                        <strong>{{ formatDate(dateRange.end) }}</strong>
                    </span>
                </div>

                <form @submit.prevent="generateReport">
                    <div class="form-container">
                        <div>
                            <label for="time1">Fecha Desde</label>
                            <input type="date" 
                                   id="time1" 
                                   v-model="dates.startDate" 
                                   :min="dateRange.start"
                                   :max="dateRange.end"
                                   required 
                                   class="form-control input-time">
                        </div>
                        <div>
                            <label for="time2">Fecha Hasta</label>
                            <input type="date" 
                                   id="time2" 
                                   v-model="dates.endDate" 
                                   :min="dateRange.start"
                                   :max="dateRange.end"
                                   required 
                                   class="form-control input-time">
                        </div>
                        <button type="submit" class="button-time btn btn-primary" :disabled="isLoading">
                            {{ isLoading ? 'Generando...' : 'Generar Excel' }}
                        </button>
                    </div>
                </form>

                <!-- Tabla de resultados -->
                <div class="mt-4" v-if="reportData.length > 0">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Debe</th>
                                    <th>Haber</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in reportData" :key="index">
                                    <td>{{ formatDate(item.date) }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>{{ formatCurrency(item.debit) }}</td>
                                    <td>{{ formatCurrency(item.credit) }}</td>
                                    <td>{{ formatCurrency(item.balance) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="table-info">
                                    <td colspan="2"><strong>Totales</strong></td>
                                    <td><strong>{{ formatCurrency(totalDebit) }}</strong></td>
                                    <td><strong>{{ formatCurrency(totalCredit) }}</strong></td>
                                    <td><strong>{{ formatCurrency(finalBalance) }}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
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

    dateRange = {
        start: '',
        end: ''
    };

    reportData: any[] = [];
    isLoading = false;

    get totalDebit(): number {
        return this.reportData.reduce((sum, item) => sum + (item.debit || 0), 0);
    }

    get totalCredit(): number {
        return this.reportData.reduce((sum, item) => sum + (item.credit || 0), 0);
    }

    get finalBalance(): number {
        return this.totalDebit - this.totalCredit;
    }

    async created() {
        await this.getDateRange();
    }

    async getDateRange() {
    try {
        const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/journal/dates', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        const { minDate, maxDate } = response.data.data;

        // Establecer fechas mínimas y máximas
        this.dateRange.start = minDate;
        this.dateRange.end = maxDate;
        
        // Establecer fechas por defecto
        this.dates.startDate = minDate;
        this.dates.endDate = maxDate;

    } catch (error: any) {
        console.error('Error al obtener el rango de fechas:', error);
    }
}

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

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatCurrency(amount: number): string {
        return new Intl.NumberFormat('es-VE', {
            style: 'currency',
            currency: 'VES'
        }).format(amount || 0);
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

.table {
    margin-top: 20px;
}

.table th, .table td {
    vertical-align: middle;
}

.table-responsive {
    overflow-x: auto;
}

.date-range-info {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    background-color: #e8f4ff;
    border: 1px solid #b8daff;
    color: #004085;
}

.date-range-info i {
    font-size: 1.2rem;
}

.date-range-info strong {
    color: #002752;
}
</style> 