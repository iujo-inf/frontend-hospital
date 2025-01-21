<template>
    <div class="container mt-5">
        <input type="text" class="form-control mb-3" placeholder="Buscar por  Fecha, Proveedor, N° de Orden o Estado"
            v-model="searchQuery" />
        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>N° de Orden</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="buy in filteredBuys" :key="buy.id">
                    <td>{{ buy.date }}</td>
                    <td>{{ buy.supplier }}</td>
                    <td>{{ buy.invoiceNumber }}</td>
                    <td>${{ buy.amount }}</td>
                    <td>{{ buy.status }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editBuy(buy.id)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <button class="btn btn-primary btn-sm">Agregar Compra</button> -->
</template>

<script>
export default {
    name: 'DataGridBuy',
    data() {
        return {
            searchQuery: '',
            buys: [
                { id: 1, invoiceNumber: '422001', date: '2024-12-19', amount: 32000, supplier: "Tecnomed", status: 'Realizado' },
                { id: 2, invoiceNumber: '423001', date: '2024-12-26', amount: 29040, supplier: "Textil Salud", status: 'Cancelado' },
                { id: 3, invoiceNumber: '418005', date: '2025-01-05', amount: 19290, supplier: "Innovasalud", status: 'Realizado' },
                { id: 4, invoiceNumber: '412009', date: '2025-01-09', amount: 10020, supplier: "MedSupply", status: 'Cancelado' },
                { id: 5, invoiceNumber: '422001', date: '2025-01-15', amount: 5000, supplier: "Tecnomed", status: 'Realizado' },
            ],
        };
    },
    computed: {
        filteredBuys() {
            return this.buys.filter(buy => {
                const fullName = `${buy.invoiceNumber} ${buy.supplier} ${buy.date} ${buy.status}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        editBuy(id) {
            alert(`Editar compra con ID: ${id}`);

        },
        deleteBuy(id) {
            alert(`Eliminar compra con ID: ${id}`);

        },
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>
