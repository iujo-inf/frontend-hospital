<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por RIF, Dirección o Razon Social" v-model="searchQuery" />
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Proveedores" width="45" height="45" class="iconColor">
                    <b>Agregar Proveedor</b>
                </button>
                <button class="btn btn-secondary btn-block" style="display: flex;" @click="openInactiveModal()">
                    <img src="/iconos/.svg" alt="Ver Inactivos" width="45" height="45" class="iconColor">
                    <b>Ver Inactivos</b>
                </button>
            </div>
        </div>

        <!-- Modal de Proveedores Inactivos -->
        <div v-if="showInactiveModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">Proveedores Inactivos</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>RIF</th>
                            <th>Dirección</th>
                            <th>Razón Social</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="supplier in inactiveSuppliers" :key="supplier.id">
                            <td>{{ supplier.rif }}</td>
                            <td>{{ supplier.address }}</td>
                            <td>{{ supplier.business_name }}</td>
                            <td>
                                <button class="btn btn-success btn-sm" @click="activateSupplier(supplier.id)">
                                    Activar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="form-group button-group">
                    <button type="button" @click="closeInactiveModal" class="btn btn-secondary btn-lg">Cerrar</button>
                </div>
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
                            <label for="businessName">Razón Social</label>
                            <input type="text" id="businessName" v-model="currentSupplier.business_name" required class="form-control">
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
                    <th>Razón Social</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="supplier in activeFilteredSuppliers" :key="supplier.id">
                    <td>{{ supplier.rif }}</td>
                    <td>{{ supplier.address }}</td>
                    <td>{{ supplier.business_name }}</td>
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
import axios from 'axios';
import Swal from 'sweetalert2';
import authGuard from '@/mixins/authGuard';

export default {
    name: 'DataGridSupplier',
    mixins: [authGuard],
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentSupplier: {
                id: null,
                rif: '',
                address: '',
                business_name: '',
                status: true
            },
            suppliers: [],
            baseURL: 'https://backend-hospital-mediplus.onrender.com/api/supplier',
            showInactiveModal: false,
        };
    },
    computed: {
        filteredSuppliers() {
            return this.suppliers.filter(supplier => {
                const searchString = `${supplier.rif} ${supplier.address} ${supplier.business_name}`.toLowerCase();
                return searchString.includes(this.searchQuery.toLowerCase());
            });
        },
        activeFilteredSuppliers() {
            return this.filteredSuppliers.filter(supplier => supplier.status);
        },
        inactiveSuppliers() {
            return this.suppliers.filter(supplier => !supplier.status);
        }
    },
    async created() {
        await this.loadSuppliers();
    },
    methods: {
        async loadSuppliers() {
            try {
                const response = await axios.get(this.baseURL);
                this.suppliers = response.data.data.suppliers;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los proveedores'
                });
            }
        },

        async saveSupplier() {
            try {
                const supplierData = {
                    rif: this.currentSupplier.rif,
                    address: this.currentSupplier.address,
                    business_name: this.currentSupplier.business_name
                };

                const existingSupplier = this.suppliers.find(s => 
                    s.rif === supplierData.rif && 
                    (!this.isEditing || s.id !== this.currentSupplier.id)
                );

                if (existingSupplier) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Ya existe un proveedor con este RIF'
                    });
                    return;
                }

                if (this.isEditing) {
                    await axios.put(`${this.baseURL}/${this.currentSupplier.id}`, {
                        ...supplierData,
                        status: this.currentSupplier.status
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Proveedor actualizado con éxito'
                    });
                } else {
                    await axios.post(this.baseURL, supplierData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Proveedor creado con éxito'
                    });
                }
                
                await this.loadSuppliers();
                this.closeModal();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Error al guardar el proveedor'
                });
            }
        },

        async deleteSupplier(id) {
            const supplier = this.suppliers.find(s => s.id === id);
            if (!supplier) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea eliminar el proveedor con RIF: ${supplier.rif}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    await axios.delete(`${this.baseURL}/${id}`);
                    await this.loadSuppliers();
                    Swal.fire(
                        'Eliminado',
                        `El proveedor ${supplier.rif} ha sido eliminado con éxito`,
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar el proveedor'
                    });
                }
            }
        },

        openModal() {
            this.isEditing = false;
            this.currentSupplier = {
                id: null,
                rif: '',
                address: '',
                business_name: '',
                status: true
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        async editSupplier(id) {
            try {
                const response = await axios.get(`${this.baseURL}/${id}`);
                const supplierData = response.data.data.supplier || response.data.data;
                this.currentSupplier = {
                    id: supplierData.id,
                    rif: supplierData.rif,
                    address: supplierData.address,
                    business_name: supplierData.business_name,
                    status: supplierData.status
                };
                this.isEditing = true;
                this.showModal = true;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al obtener los datos del proveedor'
                });
            }
        },
        openInactiveModal() {
            this.showInactiveModal = true;
        },
        closeInactiveModal() {
            this.showInactiveModal = false;
        },
        async activateSupplier(id) {
            try {
                const supplier = this.suppliers.find(s => s.id === id);
                if (supplier) {
                    await axios.put(`${this.baseURL}/${id}`, {
                        ...supplier,
                        status: true
                    });
                    await this.loadSuppliers();
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Proveedor activado con éxito'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al activar el proveedor'
                });
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

.btn-block {
    align-items: center;
    padding: 5px 15px;
}

.table {
    width: 100%;
}
</style>