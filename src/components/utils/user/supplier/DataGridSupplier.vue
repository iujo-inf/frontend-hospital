<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por RIF, Dirección o Razon Social" v-model="searchQuery" />
            <div>
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Proveedores" width="45" height="45" class="iconColor">
                    <b>Agregar Proveedor</b>
                </button>
            </div>
        </div>

        <!---------------- Modal Agregar/Editar Proveedor ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Proveedor</h2>
                <form @submit.prevent="saveSupplier">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rif">RIF</label>
                            <input type="text" id="rif" v-model="currentSupplier.rif" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="address">Dirección</label>
                            <input type="text" id="address" v-model="currentSupplier.address" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="businessName">Razon Social</label>
                            <input type="text" id="businessName" v-model="currentSupplier.businessName" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="status">Estado</label>
                            <select id="status" v-model="currentSupplier.status" required class="form-control">
                                <option value=true>Activo</option>
                                <option value=false>Inactivo</option>
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
        <!---------------- Modal Agregar/Editar Proveedor ---------------->

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>RIF</th>
                    <th>Dirección</th>
                    <th>Razon Social</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="supplier in filteredSuppliers" :key="supplier.id">
                    <td>{{ supplier.rif }}</td>
                    <td>{{ supplier.address }}</td>
                    <td>{{ supplier.businessName }}</td>
                    <td>{{ supplier.status ? 'Activo' : 'Inactivo' }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editSupplier(supplier.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteSupplier(supplier.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridSupplier',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentSupplier: {
                id: null,
                rif: '',
                address: '',
                businessName: '',
                status: true
            },
            suppliers: [
                { id: 1, rif: '123456789', address: 'Calle Principal 123', businessName: 'Empresa A', status: true },
                { id: 2, rif: '987654321', address: 'Avenida Central 456', businessName: 'Empresa B', status: false },
                { id: 3, rif: '555555555', address: 'Calle Secundaria 789', businessName: 'Empresa C', status: true },
                { id: 4, rif: '111111111', address: 'Avenida Principal 321', businessName: 'Empresa D', status: false },
                { id: 5, rif: '222222222', address: 'Calle Central 654', businessName: 'Empresa E', status: true },
            ]

        };
    },
    computed: {
        filteredSuppliers() {
            return this.suppliers.filter(supplier => {
                const fullName = `${supplier.rif} ${supplier.address} ${supplier.businessName} ${supplier.status}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    updatedSuppliers: {
        get() {
            return this.suppliers.map(supplier => {
                if (supplier.id === this.currentSupplier.id) {
                    return { ...supplier, ...this.currentSupplier };
                }
                return supplier;
            });
        },
        set(value) {
            this.suppliers = value;
        }
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.currentSupplier = {
                id: null,
                rif: '',
                address: '',
                businessName: '',
                status: true
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        editSupplier(id) {
            const supplierToEdit = this.suppliers.find(supplier => supplier.id === id);
            if (supplierToEdit) {
                this.currentSupplier = { ...supplierToEdit };
                this.isEditing = true;
                this.showModal = true;
            }
        },
        saveSupplier() {
            if (this.isEditing) {
                const index = this.suppliers.findIndex(supplier => supplier.id === this.currentSupplier.id);
                if (index !== -1) {
                    this.suppliers.splice(index, 1, { ...this.currentSupplier });
                }
            } else {
                const newId = Math.max(...this.suppliers.map(supplier => supplier.id)) + 1;
                this.suppliers.push({
                    id: newId,
                    ...this.currentSupplier
                });
            }
            this.closeModal();
        },
        deleteSupplier(id) {
            if (confirm(`¿Está seguro que desea eliminar el proveedor con ID: ${id}?`)) {
                this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);
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