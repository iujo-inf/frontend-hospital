<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3" placeholder="Buscar por Fecha, Proveedor, N° de Orden"
                v-model="searchQuery" />
        </div>

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Fecha</th>
                    <th>N° de Orden</th>
                    <th>Proveedor</th>
                    <th>Monto Total</th>
                    <th>Departamento</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="buy in filteredBuys" :key="buy.id">
                    <td>{{ formatDate(buy.date) }}</td>
                    <td>{{ buy.invoice_number }}</td>
                    <td>{{ buy.supplier.business_name }}</td>
                    <td>${{ calculateTotalAmount(buy) }}</td>
                    <td>{{ buy.departament.department_name }}</td>
                    <td><span :class="statusClass(buy.status)">{{ buy.status }}</span></td>
                    <td>
                        <button v-if="buy.status === 'pendiente'" class="btn btn-primary btn-sm" @click="approveBuy(buy.id)">Aprobar</button>
                        <button v-if="buy.status === 'pendiente'" class="btn btn-danger btn-sm" @click="rejectBuy(buy.id)">Rechazar</button>
                        <button v-else class="btn btn-secondary btn-sm" @click="openEditStatusModal(buy)">Editar Estado</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal para editar el estado de la compra -->
        <div v-if="showEditStatusModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">Editar Estado de Compra</h2>
                <form @submit.prevent="updateBuyStatus">
                    <div class="form-group">
                        <label for="status">Estado</label>
                        <select id="status" v-model="currentBuy.status" class="form-control">
                            <option value="aprobada">Aprobada</option>
                            <option value="rechazada">Rechazada</option>
                            <option value="pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div class="form-group button-group">
                        <button type="button" @click="closeEditStatusModal" class="btn btn-secondary">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'DataGridBuy',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            showEditStatusModal: false,
            isEditing: false,
            currentBuy: {
                id: null,
                date: this.getCurrentDate(),
                invoiceNumber: '',
                supplier: '',
                amount: 0,
                department: null,
                buy_details: [],
                status: ''
            },
            newDetail: {
                product_id: null,
                quantity: 0,
                buy_price: 0
            },
            buys: [],
            baseURL: 'https://backend-hospital-mediplus.onrender.com/api/buy',
            currentPage: 1,
            itemsPerPage: 7,
            uniqueProducts: [
                { id: 1, name: 'Producto A' },
                { id: 2, name: 'Producto B' },
                { id: 3, name: 'Producto C' }
            ]
        };
    },
    computed: {
        filteredBuys() {
            return this.buys.filter(buy => {
                const fullName = `${buy.invoice_number} ${buy.supplier.business_name} ${buy.date} ${buy.departament.department_name}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
        paginatedBuys() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredBuys.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredBuys.length / this.itemsPerPage);
        },
        uniqueSuppliers() {
            return [...new Map(this.buys.map(buy => [buy.supplier.id, buy.supplier])).values()];
        },
        uniqueDepartments() {
            return [...new Map(this.buys.map(buy => [buy.departament.id, buy.departament])).values()];
        }
    },
    async created() {
        await this.loadBuys();
    },
    methods: {
        async loadBuys() {
            try {
                const response = await axios.get(this.baseURL);
                this.buys = response.data.data.buys.sort((a, b) => b.id - a.id);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar las compras'
                });
            }
        },
        openModal() {
            this.isEditing = false;
            this.currentBuy = {
                id: null,
                date: this.getCurrentDate(),
                invoiceNumber: '',
                supplier: '',
                amount: 0,
                department: null,
                buy_details: [],
                status: ''
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        openEditStatusModal(buy) {
            this.currentBuy = { ...buy };
            this.showEditStatusModal = true;
        },
        closeEditStatusModal() {
            this.showEditStatusModal = false;
        },
        async approveBuy(id) {
            const buy = this.buys.find(b => b.id === id);
            if (!buy) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea aprobar la compra con N° de Orden ${buy.invoice_number}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, aprobar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    // Preparar los datos para la actualización
                    const buyData = {
                        invoice_number: buy.invoice_number,
                        date: buy.date,
                        supplier_id: buy.supplier.id,
                        department_id: buy.departament.id,
                        status: 'aprobada',
                        buy_details: buy.buy_details
                    };

                    await axios.put(`${this.baseURL}/${id}`, buyData);
                    await this.loadBuys();
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Aprobada',
                        text: `La compra con N° de Orden ${buy.invoice_number} ha sido aprobada con éxito`,
                        timer: 1500
                    });
                } catch (error) {
                    console.error('Error al aprobar:', error);
                    console.error('Respuesta del servidor:', error.response?.data);
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || 'Error al aprobar la compra'
                    });
                }
            }
        },
        
        async rejectBuy(id) {
            const buy = this.buys.find(b => b.id === id);
            if (!buy) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea rechazar la compra con N° de Orden ${buy.invoice_number}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, rechazar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    // Preparar los datos para la actualización
                    const buyData = {
                        invoice_number: buy.invoice_number,
                        date: buy.date,
                        supplier_id: buy.supplier.id,
                        department_id: buy.departament.id,
                        status: 'rechazada',
                        buy_details: buy.buy_details
                    };

                    await axios.put(`${this.baseURL}/${id}`, buyData);
                    await this.loadBuys();
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Rechazada',
                        text: `La compra con N° de Orden ${buy.invoice_number} ha sido rechazada con éxito`,
                        timer: 1500
                    });
                } catch (error) {
                    console.error('Error al rechazar:', error);
                    console.error('Respuesta del servidor:', error.response?.data);
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response?.data?.message || 'Error al rechazar la compra'
                    });
                }
            }
        },
        async updateBuyStatus() {
            try {
                // Obtener la compra original
                const originalBuy = this.buys.find(b => b.id === this.currentBuy.id);
                if (!originalBuy) {
                    throw new Error('Compra no encontrada');
                }

                // Preparar los datos para la actualización
                const buyData = {
                    invoice_number: originalBuy.invoice_number,
                    date: originalBuy.date,
                    supplier_id: originalBuy.supplier.id,
                    department_id: originalBuy.departament.id,
                    status: this.currentBuy.status,
                    buy_details: originalBuy.buy_details
                };

                // Realizar la actualización
                await axios.put(`${this.baseURL}/${this.currentBuy.id}`, buyData);
                
                // Actualizar la lista de compras
                await this.loadBuys();
                
                // Cerrar el modal
                this.closeEditStatusModal();
                
                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: `El estado de la compra con N° de Orden ${originalBuy.invoice_number} ha sido actualizado con éxito`,
                    timer: 1500
                });
            } catch (error) {
                console.error('Error al actualizar:', error);
                console.error('Respuesta del servidor:', error.response?.data);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Error al actualizar el estado de la compra'
                });
            }
        },
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        calculateTotalAmount(buy) {
            return buy.buy_details.reduce((total, detail) => {
                return total + (parseFloat(detail.buy_price) * detail.quantity);
            }, 0).toFixed(2);
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        addDetailBuy() {
            if (this.newDetail.product_id && this.newDetail.quantity > 0 && this.newDetail.buy_price > 0) {
                this.currentBuy.buy_details.push({ ...this.newDetail });
                this.newDetail = { product_id: null, quantity: 0, buy_price: 0 };
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Por favor, complete todos los campos del detalle de compra'
                });
            }
        },
        statusClass(status) {
            switch (status) {
                case 'aprobada':
                    return 'status aprobada';
                case 'pendiente':
                    return 'status pendiente';
                case 'rechazada':
                    return 'status rechazada';
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

.modal-overlay {
    z-index: 1000 !important;
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.status {
    display: inline-block;
    padding: 5px 15px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-size: 14px;
}

.rechazada {
    border: 2px solid red;
    background-color: white;
    color: red;
}

.pendiente {
    border: 2px solid orange;
    background-color: white;
    color: orange;
}

.aprobada {
    border: 2px solid green;
    background-color: white;
    color: green;
}
</style>