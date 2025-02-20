<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por  Fecha, Proveedor, N° de Orden o Estado" v-model="searchQuery" />

        </div>

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>N° de Orden</th>
                    <th>Monto</th>
                    <th>Departamento</th>
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
                    <td>{{ buy.department }}</td>
                    <td><span :class="statusClass(buy.status)">{{ buy.status }}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editBuy(buy.id)">Aceptar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteBuy(buy.id)">Rechazar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'DataGridBuyRequest',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentBuy: {
                id: null,
                date: '',
                supplier: '',
                invoiceNumber: '',
                amount: 0,
                department: 'Solicitado'
            },
            buys: [
                { id: 1, invoiceNumber: '422001', date: '2024-12-19', amount: 32000, supplier: "Tecnomed", department: 'Cirugía', status: 'Aprobado' },
                { id: 2, invoiceNumber: '423001', date: '2024-12-26', amount: 29040, supplier: "Textil Salud", department: 'Si', status: 'Rechazado' },
                { id: 3, invoiceNumber: '418005', date: '2025-01-05', amount: 19290, supplier: "Innovasalud", department: 'Cirugía', status: 'Rechazado' },
                { id: 4, invoiceNumber: '412009', date: '2025-01-09', amount: 10020, supplier: "MedSupply", department: 'Si', status: 'Aprobado' },
                { id: 5, invoiceNumber: '422001', date: '2025-01-15', amount: 5000, supplier: "Tecnomed", department: 'Cirugía', status: 'Pendiente' },
            ],
        };
    },
    computed: {
        filteredBuys() {
            return this.buys.filter(buy => {
                const fullName = `${buy.invoiceNumber} ${buy.supplier} ${buy.date} ${buy.department} ${buy.status}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.currentBuy = {
                id: null,
                date: this.getCurrentDate(),
                supplier: '',
                invoiceNumber: '',
                amount: 0,
                department: 'Solicitado'
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        saveBuy() {
            if (this.isEditing) {
                const index = this.buys.findIndex(buy => buy.id === this.currentBuy.id);
                if (index !== -1) {
                    this.buys.splice(index, 1, { ...this.currentBuy });
                }
            } else {
                const newId = Math.max(...this.buys.map(b => b.id), 0) + 1; // Manejo de array vacío
                this.buys.push({
                    id: newId,
                    ...this.currentBuy
                });
            }
            this.closeModal();
        },
        statusClass(status) {
            switch (status) {
                case 'Aprobado':
                    return 'status aprobado';
                case 'Pendiente':
                    return 'status pendiente';
                case 'Rechazado':
                    return 'status rechazado';
                default:
                    return '';
            }
        }
    },
};




</script>

<style scoped>
.iconColor {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
}

.table {
    margin-top: 20px;
}

.grid-view {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}

.status {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-size: 14px;
}

.aprobado {
    border: 2px solid red;
    background-color: white;
    color: red;
}

.pendiente {
    border: 2px solid orange;
    background-color: white;
    color: orange;
}

.rechazado {
    border: 2px solid green;
    background-color: white;
    color: green;
}
</style>
