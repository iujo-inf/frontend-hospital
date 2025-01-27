<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por  Fecha, Proveedor, N° de Orden o Estado" v-model="searchQuery" />
            <div>
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Compras" width="45" height="45" class="iconColor">
                    <b>Agregar Compra</b>
                </button>
            </div>
        </div>

        <!---------------- Modal Agregar/Editar Compra ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Compra</h2>
                <form @submit.prevent="saveBuy">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="date">Fecha</label>
                            <input type="date" id="date" v-model="currentBuy.date" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="supplier">Proveedor</label>
                            <input type="text" id="supplier" v-model="currentBuy.supplier" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="invoiceNumber">N° de Orden</label>
                            <input type="text" id="invoiceNumber" v-model="currentBuy.invoiceNumber" required
                                class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="amount">Monto</label>
                            <input type="number" id="amount" v-model="currentBuy.amount" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="status">Estado</label>
                            <select id="status" v-model="currentBuy.status" required class="form-control">
                                <option value="Solicitado">Solicitado</option>
                                <option value="Realizado">Realizado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group button-group">
                        <button type="button" @click="closeModal" class="btn btn-secondary btn-lg">Cancelar</button>
                        <button type="submit" class="btn btn-primary btn-lg">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
                    </div>
                </form>
            </div>
        </div>
        <!---------------- Modal Agregar/Editar Compra ---------------->

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
                        <button class="btn btn-danger btn-sm" @click="deleteBuy(buy.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridBuy',
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
                status: 'Solicitado'
            },
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
        openModal() {
            this.isEditing = false;
            this.currentBuy = {
                id: null,
                date: '',
                supplier: '',
                invoiceNumber: '',
                amount: 0,
                status: 'Solicitado'
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        editBuy(id) {
            const buyToEdit = this.buys.find(buy => buy.id === id);
            if (buyToEdit) {
                this.currentBuy = { ...buyToEdit };
                this.isEditing = true;
                this.showModal = true;
            }
        },
        saveBuy() {
            if (this.isEditing) {
                const index = this.buys.findIndex(buy => buy.id === this.currentBuy.id);
                if (index !== -1) {
                    this.buys.splice(index, 1, { ...this.currentBuy });
                }
            } else {
                const newId = Math.max(...this.buys.map(b => b.id)) + 1;
                this.buys.push({
                    id: newId,
                    ...this.currentBuy
                });
            }
            this.closeModal();
        },
        deleteBuy(id) {
            if (confirm(`¿Está seguro que desea eliminar la compra con ID: ${id}?`)) {
                this.buys = this.buys.filter(buy => buy.id !== id);
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 700px;
    justify-content: center;
}

.modal-title {
    text-align: left;
    margin-bottom: 20px;
    color: #333;
}

.form-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.form-group {
    flex: 0 0 48%;
}

.form-group label {
    text-align: left;
    display: block;
    margin: 0 5px;
    font-weight: bold;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.btn-secondary {
    margin-right: 10px;
}
</style>
