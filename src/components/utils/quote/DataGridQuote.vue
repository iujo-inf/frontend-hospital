<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input medico="text" class="form-control mb-3"
                placeholder="Buscar por  paciente, doctor" v-model="searchQuery" />
            <div>
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="ventas" width="45" height="45" class="iconColor">
                    <b>Agregar Cita o paciente</b>
                </button>
            </div>
        </div>
        
        <!---------------- Modal Agregar/Editar venta ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Venta</h2>
                <form @submit.prevent="savequotes">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="status">Estado</label>
                            <select id="status" v-model="currentquotes.status" required class="form-control">
                                <option value="Atendido">Atendido</option>
                                <option value="Espera">Espera</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="date">Paciente</label>
                            <input type="text" id="date" v-model="currentquotes.paciente" required class="form-control">
                        </div>                                            
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="Medico">Medico</label>
                            <input type="text" id="medico" v-model="currentquotes.medico" required class="form-control">
                        </div>   
                        <div class="form-group">
                            <label for="date">Fecha</label>
                            <input type="date" id="date" v-model="currentquotes.date" required class="form-control">
                        </div>   
                    </div>
                    <div class="form-row">                        
                        <div class="form-group">
                            <label for="Area">Area</label>
                            <input type="text" id="paciente" v-model="currentquotes.area" required class="form-control">
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
                    <th>Estado</th>
                    <th>Paciente</th>
                    <th>Medico</th>
                    <th>Fecha</th>
                    <th>Area</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="quotes in filteredquotes" :key="quotes.id">
                    <td v-bind:class="{'positive': quotes.status=='Espera', 'negative': quotes.status=='Atendido'}">
                        {{ quotes.status }}
                    </td>
                    <td>{{ quotes.paciente }}</td>
                    <td>{{ quotes.medico }}</td>
                    <td>{{ quotes.date }}</td>
                    <td>{{ quotes.area }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editQuotes(quotes.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteQuotes(quotes.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridQuote',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentquotes: {
                id: null,
                date: '',
                medico: '',
                status: '',
                paciente: '',
                area: ''
            },
            quotes: [
                { id: 1, status: 'Espera', date: '2024-02-19', paciente: 'Maria', medico: "Simom", area: 'Consultoria N13' },
                { id: 2, status: 'Atendido', date: '2024-05-26', paciente:'Digelys', medico: "Jose", area: 'Consultoria N14' },
                { id: 3, status: 'Espera', date: '2025-01-01', paciente: 'Arianna', medico: "Miguel", area: 'Consultoria N16' },
                { id: 4, status: 'Atendido', date: '2025-01-05', paciente: 'Diego', medico: "Luis", area: 'Consultoria N1' },
                { id: 5, status: 'Espera', date: '2025-01-14', paciente: 'Daniel', medico: "Andrea", area: 'Consultoria N4' },
                { id: 5, status: 'Atendido', date: '2025-01-22', paciente: 'Francisco', medico: "Kelvin", area: 'Consultoria N55' },
            ],
        };
    },
    computed: {
        filteredquotes() {
            return this.quotes.filter(quotes => {
                const fullName = `${quotes.status} ${quotes.medico} ${quotes.paciente} ${quotes.area}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.currentquotes = {
                id: null,
                date: '',
                medico: '',
                status: '',
                paciente: '',
                area: ''
            };
            this.showModal = true;
        },        
        editQuotes(id) {
            const quotesToEdit = this.quotes.find(quotes => quotes.id === id);
            if (quotesToEdit) {
                this.currentquotes = { ...quotesToEdit };
                this.isEditing = true;
                this.showModal = true;
            }
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        savequotes() {
            if (this.isEditing) {
                const index = this.quotes.findIndex(quotes => quotes.id === this.currentquotes.id);
                if (index !== -1) {
                    this.quotes.splice(index, 1, { ...this.currentquotes });
                }
            } else {
                const newId = Math.max(...this.quotes.map(b => b.id)) + 1;
                this.quotes.push({
                    id: newId,
                    ...this.currentquotes
                });
            }
            this.closeModal();
        },
        
        deleteQuotes(id) {
            if (confirm(`¿Está seguro que desea eliminar la compra con ID: ${id}?`)) {
                this.quotes = this.quotes.filter(quotes => quotes.id !== id);
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
.positive {
    color: green;
}

.negative {
    color: red;
}
</style>
