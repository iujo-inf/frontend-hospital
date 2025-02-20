<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por Nombre, Apellido, Email o Teléfono" v-model="searchQuery" />
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Clientes" width="45" height="45" class="iconColor">
                    <b>Agregar Cliente</b>
                </button>
                <button class="btn btn-secondary btn-block" style="display: flex;" @click="openInactiveModal()">
                    <img src="/iconos/.svg" alt="Ver Inactivos" width="45" height="45" class="iconColor">
                    <b>Ver Inactivos</b>
                </button>
            </div>
        </div>

        <!-- Modal de Clientes Inactivos -->
        <div v-if="showInactiveModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">Clientes Inactivos</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="client in inactiveClients" :key="client.id">
                            <td>{{ client.name }}</td>
                            <td>{{ client.last_name }}</td>
                            <td>{{ client.email }}</td>
                            <td>{{ client.phone_number }}</td>
                            <td>
                                <button class="btn btn-success btn-sm" @click="activateClient(client.id)">
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

        <!---------------- Modal Agregar/Editar Cliente ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Cliente</h2>
                <form @submit.prevent="saveClient">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" id="name" v-model="currentClient.name" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="lastName">Apellido</label>
                            <input type="text" id="lastName" v-model="currentClient.last_name" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="currentClient.email" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="phoneNumber">Teléfono</label>
                            <input type="text" id="phoneNumber" v-model="currentClient.phone_number" required class="form-control"
                                   pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" placeholder="0412-123-4567">
                        </div>
                    </div>
                    <div class="form-group button-group">
                        <button type="button" @click="closeModal" class="btn btn-secondary btn-lg">Cancelar</button>
                        <button type="submit" class="btn btn-primary btn-lg">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
                    </div>
                </form>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in paginatedClients" :key="client.id">
                    <td>{{ client.name }}</td>
                    <td>{{ client.last_name }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.phone_number }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editClient(client.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteClient(client.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Paginación -->
        <div class="pagination-container" v-if="totalPages > 1">
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="currentPage--">Anterior</a>
                    </li>
                    <li class="page-item" v-for="page in totalPages" :key="page" 
                        :class="{ active: page === currentPage }">
                        <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="currentPage++">Siguiente</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'DataGridClient',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            showInactiveModal: false,
            isEditing: false,
            currentClient: {
                id: null,
                name: '',
                last_name: '',
                email: '',
                phone_number: ''
            },
            clients: [],
            baseURL: 'https://backend-hospital-mediplus.onrender.com/api/client',
            currentPage: 1,
            itemsPerPage: 7
        };
    },
    computed: {
        filteredClients() {
            return this.clients.filter(client => {
                const searchString = `${client.name} ${client.last_name} ${client.email} ${client.phone_number}`.toLowerCase();
                return searchString.includes(this.searchQuery.toLowerCase());
            });
        },
        activeFilteredClients() {
            return this.filteredClients
                .filter(client => !client.deletedAt)
                .sort((a, b) => a.id - b.id);
        },
        inactiveClients() {
            return this.clients
                .filter(client => client.deletedAt)
                .sort((a, b) => a.id - b.id);
        },
        paginatedClients() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.activeFilteredClients.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.activeFilteredClients.length / this.itemsPerPage);
        }
    },
    async created() {
        await this.loadClients();
    },
    methods: {
        async loadClients() {
            try {
                const response = await axios.get(this.baseURL);
                this.clients = response.data.data.clients.sort((a, b) => a.id - b.id);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los clientes'
                });
            }
        },

        async saveClient() {
            try {
                const clientData = {
                    name: this.currentClient.name,
                    last_name: this.currentClient.last_name,
                    email: this.currentClient.email,
                    phone_number: this.currentClient.phone_number
                };

                const existingClient = this.clients.find(c => 
                    c.email === clientData.email && 
                    (!this.isEditing || c.id !== this.currentClient.id)
                );

                if (existingClient) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Ya existe un cliente con este email'
                    });
                    return;
                }

                if (this.isEditing) {
                    await axios.put(`${this.baseURL}/${this.currentClient.id}`, clientData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Cliente actualizado con éxito'
                    });
                } else {
                    await axios.post(this.baseURL, clientData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Cliente creado con éxito'
                    });
                }
                
                await this.loadClients();
                this.closeModal();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Error al guardar el cliente'
                });
            }
        },

        async deleteClient(id) {
            const client = this.clients.find(c => c.id === id);
            if (!client) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea eliminar el cliente ${client.name} ${client.last_name}?`,
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
                    await this.loadClients();
                    Swal.fire(
                        'Eliminado',
                        `El cliente ${client.name} ${client.last_name} ha sido eliminado con éxito`,
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar el cliente'
                    });
                }
            }
        },

        async activateClient(id) {
            try {
                const client = this.clients.find(c => c.id === id);
                if (client) {
                    await axios.put(`${this.baseURL}/${id}`, {
                        name: client.name,
                        last_name: client.last_name,
                        email: client.email,
                        phone_number: client.phone_number,
                        deletedAt: null
                    });
                    await this.loadClients();
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Cliente activado con éxito'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al activar el cliente'
                });
            }
        },

        async editClient(id) {
            try {
                const client = this.clients.find(c => c.id === id);
                if (client) {
                    this.currentClient = {
                        id: client.id,
                        name: client.name,
                        last_name: client.last_name,
                        email: client.email,
                        phone_number: client.phone_number
                    };
                    this.isEditing = true;
                    this.showModal = true;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al obtener los datos del cliente'
                });
            }
        },

        openModal() {
            this.isEditing = false;
            this.currentClient = {
                id: null,
                name: '',
                last_name: '',
                email: '',
                phone_number: ''
            };
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },

        openInactiveModal() {
            this.showInactiveModal = true;
        },

        closeInactiveModal() {
            this.showInactiveModal = false;
        }
    },
    watch: {
        // Resetear a la primera página cuando cambia el filtro
        searchQuery() {
            this.currentPage = 1;
        }
    }
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
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 90%;
    max-width: 700px;
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
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn-block {
    align-items: center;
    padding: 5px 15px;
}

.pagination-container {
    margin-top: 20px;
}

.pagination {
    margin-bottom: 0;
}

.page-link {
    color: #2d60ff;
    cursor: pointer;
}

.page-item.active .page-link {
    background-color: #2d60ff;
    border-color: #2d60ff;
    color: white;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: default;
}
</style> 