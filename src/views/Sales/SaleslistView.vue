<template>
    <div class="SalesList">
        <BaseLayout page-title="Ventas">
            <DataGridSales :sales="salesData" :clients="clientData"  :products="productsData" :patients="patientsData" :payments="paymentData"/>
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridSales from '@/components/utils/Sales/DataGridSales.vue';
import axios from 'axios';


@Options({
    components: {
        BaseLayout,
        DataGridSales,
    },
})
export default class SalesListView extends Vue {
    salesData = []; // Inicializa salesData como un array vacío
    clientData = [];
    productsData = [];
    patientsData = [];
    paymentData = [];
    async mounted() {
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/billing');
            this.salesData = response.data.data.bills; // Asigna los datos a salesData
            console.log(response)
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/client');
            this.clientData = response.data.data.clients; // Asigna los datos a salesData
            console.log(response)
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/product');
            this.productsData = response.data.data.products; // Asigna los datos a salesData
            console.log(response)
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/patient');
            this.patientsData = response.data.data.patients; // Asigna los datos a salesData
            console.log(response)
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/paymenttype');
            this.paymentData = response.data.data.paymentTypes; // Asigna los datos a salesData
            console.log(response)
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
    }
}
</script>

<style scoped></style>
