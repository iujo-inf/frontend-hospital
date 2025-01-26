<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por  tipo, emergencia,cita y farmacia" v-model="searchQuery" />
            <div>
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="ventas" width="45" height="45" class="iconColor">
                    <b>Agregar Ventas</b>
                </button>
            </div>
        </div>
        
        <!---------------- Modal Agregar/Editar venta ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Venta</h2>
                <form @submit.prevent="savesales">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="type">Descripcion</label>
                            <input type="text" id="description" v-model="currentsales.description" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="date">Fecha</label>
                            <input type="date" id="date" v-model="currentsales.date" required class="form-control">
                        </div>                                            
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="type">Transaccion</label>
                            <input type="text" id="type" v-model="currentsales.invoiceNumber" required class="form-control">
                        </div>   
                        <div class="form-group">
                            <label for="invoiceNumber">card</label>
                            <input type="text" id="invoiceNumber" v-model="currentsales.card" required
                                class="form-control">
                        </div>
                    </div>
                    <div class="form-row">                        
                        <div class="form-group">
                            <label for="amount">Cantidad</label>
                            <input type="number" id="amount" v-model="currentsales.amount" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="description">Tipo</label>
                            <select id="description" v-model="currentsales.type" required class="form-control">
                                <option value="Emergencia">Emergencia</option>
                                <option value="Cita">Cita</option>
                                <option value="farmacia">farmacia</option>
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
        <!---------------- Modal Agregar/Editar Venta ---------------->

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Descripcion</th>
                    <th>Transaccion</th>
                    <th>Tipo</th>
                    <th>Card</th>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                    <th>Factura</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sales in filteredsales" :key="sales.id">
                    <td>{{ sales.description }}</td>
                    <td>#{{ sales.invoiceNumber }}</td>
                    <td>{{ sales.type }}</td>
                    <td>{{ sales.card }}</td>
                    <td>{{ sales.date }}</td>
                    <td v-bind:class="{'positive': sales.amount > 0, 'negative': sales.amount < 0}">
                         {{ sales.amount }}
                    </td>
                    <td>
                        <button class="btn btn-primary btn-sm">Descargar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridSales',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentsales: {
                id: null,
                date: '',
                type: '',
                invoiceNumber: '',
                amount: 0,
                description: ''
            },
            sales: [
                { id: 1, invoiceNumber: '422001', date: '2024-02-19', amount: -2500, type: "Emergencia", description: 'Atropello' , card: '1234****'},
                { id: 2, invoiceNumber: '423001', date: '2024-05-26', amount: 750, type: "cita", description: 'gripe' , card: '1234****'},
                { id: 3, invoiceNumber: '418005', date: '2025-01-01', amount: -150, type: "farmacia", description: 'metronidazol' , card: '1234****'},
                { id: 4, invoiceNumber: '412009', date: '2025-01-05', amount: -1050, type: "cita", description: 'sida' , card: '1234****'},
                { id: 5, invoiceNumber: '422001', date: '2025-01-14', amount: 840, type: "farmacia", description: 'acetaminofen' , card: '1234****'},
                { id: 5, invoiceNumber: '422001', date: '2025-01-22', amount: 5000, type: "emergencia", description: 'disparo' , card: '1234****'},
            ],
        };
    },
    computed: {
        filteredsales() {
            return this.sales.filter(sales => {
                const fullName = `${sales.invoiceNumber} ${sales.type} ${sales.date} ${sales.description}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.currentsales = {
                id: null,
                date: '',
                type: '',
                invoiceNumber: '',
                amount: 0,
                description: 'Enfermo'
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        savesales() {
            if (this.isEditing) {
                const index = this.sales.findIndex(sales => sales.id === this.currentsales.id);
                if (index !== -1) {
                    this.sales.splice(index, 1, { ...this.currentsales });
                }
            } else {
                const newId = Math.max(...this.sales.map(b => b.id)) + 1;
                this.sales.push({
                    id: newId,
                    ...this.currentsales
                });
            }
            this.closeModal();
        },
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
.positive {
    color: green;
}

.negative {
    color: red;
}
</style>
