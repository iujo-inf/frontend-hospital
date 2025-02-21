<template>
    <div class="SalesList">
        <BaseLayout page-title="Ventas">
            <DataGridSales 
                :sales="salesData" 
                :clients="clientData"  
                :products="productsData" 
                :patients="patientsData" 
                :payments="paymentData"
                @sale-added="loadSalesData"
            />
        </BaseLayout>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import DataGridSales from '@/components/utils/Sales/DataGridSales.vue';
import axios from 'axios';
import authGuard from '@/mixins/authGuard';

@Options({
    components: {
        BaseLayout,
        DataGridSales,
    },
    mixins: [authGuard],
})
export default class SalesListView extends Vue {
    salesData = [];
    clientData = [];
    productsData = [];
    patientsData = [];
    paymentData = [];

    async mounted() {
        await this.loadAllData();
    }

    async loadAllData() {
        await Promise.all([
            this.loadSalesData(),
            this.loadClientData(),
            this.loadProductData(),
            this.loadPatientData(),
            this.loadPaymentData()
        ]);
    }

    async loadSalesData() {
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/billing');
            this.salesData = response.data.data.bills;
        } catch (error) {
            console.error('Error al cargar ventas:', error);
        }
    }

    async loadClientData() {
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/client');
            this.clientData = response.data.data.clients;
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
    }

    async loadProductData() {
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/product');
            this.productsData = response.data.data.products;
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
    }

    async loadPatientData() {
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/patient');
            this.patientsData = response.data.data.patients;
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
    }

    async loadPaymentData() {
        try {
            const response = await axios.get('https://backend-hospital-mediplus.onrender.com/api/paymenttype');
            this.paymentData = response.data.data.paymentTypes;
        } catch (error) {
            console.error('Error al consumir la API:', error);
        }
    }
}
</script>

<style scoped></style>