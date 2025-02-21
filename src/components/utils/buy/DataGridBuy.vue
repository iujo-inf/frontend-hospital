<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3" placeholder="Buscar por Fecha, Proveedor, N° de Orden"
                v-model="searchQuery" />
            <div>
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Compras" width="45" height="45" class="iconColor">
                    <b>Solicitar Compra</b>
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
                            <label for="invoiceNumber">N° de Orden</label>
                            <input type="text" id="invoiceNumber" v-model="currentBuy.invoiceNumber" required
                                class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier">Proveedor</label>
                            <select id="supplier" v-model="currentBuy.supplier" required class="form-control">
                                <option value="" disabled selected>Seleccione un proveedor</option>
                                <option v-for="supplier in uniqueSuppliers" 
                                        :key="supplier.id" 
                                        :value="supplier">
                                    {{ supplier.business_name }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="amount">Monto Total</label>
                            <input type="number" id="amount" v-model="currentBuy.amount" required class="form-control"
                                onkeypress="return event.charCode != 101 && event.charCode != 69 && event.charCode != 46;"
                                readonly>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="department">Departamento</label>
                            <select id="department" v-model="currentBuy.department" required class="form-control">
                                <option v-for="department in uniqueDepartments" :key="department.id"
                                    :value="department">
                                    {{ department.department_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="product">Producto</label>
                            <select id="product" v-model="newDetail.product_id" required class="form-control">
                                <option value="" disabled selected>Seleccione un producto</option>
                                <option v-for="product in uniqueProducts" 
                                        :key="product.id" 
                                        :value="product.id">
                                    {{ product.name }} - {{ product.description }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="quantity">Cantidad</label>
                            <input type="number" id="quantity" v-model="newDetail.quantity" required
                                class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="buyPrice">Precio de Compra</label>
                            <input type="number" id="buyPrice" v-model="newDetail.buy_price" required
                                class="form-control">
                        </div>
                        <button type="button" @click="addDetailBuy" class="btn btn-outline-primary" style="margin: 1rem;">Agregar Detalle</button>
                    </div>
                    <div class="table-responsive mt-3" v-if="currentBuy.buy_details.length > 0">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(detail, index) in currentBuy.buy_details" :key="index">
                                    <td>{{ getProductName(detail.product_id) }}</td>
                                    <td>{{ detail.quantity }}</td>
                                    <td>${{ detail.buy_price }}</td>
                                    <td>${{ (detail.quantity * detail.buy_price).toFixed(2) }}</td>
                                    <td>
                                        <button type="button" 
                                                class="btn btn-danger btn-sm"
                                                @click="removeDetail(index)">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="form-group button-group">
                        <button type="button" @click="closeModal" class="btn btn-secondary btn-lg">Cancelar</button>
                        <button type="submit" class="btn btn-primary btn-lg" @click.prevent="confirmUpdate">
                            {{ isEditing ? 'Actualizar' : 'Guardar' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!---------------- Modal Agregar/Editar Compra ---------------->

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Fecha</th>
                    <th>N° de Orden</th>
                    <th>Proveedor</th>
                    <th>Monto Total</th>
                    <th>Departamento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="buy in paginatedBuys" :key="buy.id">
                    <td>{{ formatDate(buy.date) }}</td>
                    <td>{{ buy.invoice_number }}</td>
                    <td>{{ buy.supplier.business_name }}</td>
                    <td>${{ calculateTotalAmount(buy) }}</td>
                    <td>{{ buy.departament.department_name }}</td>
                    <td><span :class="statusClass(buy.status)">{{ buy.status }}</span></td>
                    <td>
                        <button v-if="buy.status === 'pendiente'" class="btn btn-primary btn-sm" @click="editBuy(buy.id)">Editar</button>
                        <button v-if="buy.status === 'pendiente'" class="btn btn-danger btn-sm" @click="deleteBuy(buy.id)">Eliminar</button>
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
import authGuard from '@/mixins/authGuard';

export default {
    name: 'DataGridBuy',
    mixins: [authGuard],
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentBuy: {
                id: null,
                date: this.getCurrentDate(),
                invoiceNumber: '',
                supplier: '',
                amount: 0,
                department: null,
                buy_details: [],
                status: 'pendiente'
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
            uniqueProducts: [],
            uniqueSuppliers: [],
            productsURL: 'https://backend-hospital-mediplus.onrender.com/api/product',
            suppliersURL: 'https://backend-hospital-mediplus.onrender.com/api/supplier',
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
        uniqueDepartments() {
            return [...new Map(this.buys.map(buy => [buy.departament.id, buy.departament])).values()];
        }
    },
    async created() {
        await Promise.all([
            this.loadBuys(),
            this.loadProducts(),
            this.loadSuppliers()
        ]);
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
        async loadProducts() {
            try {
                const response = await axios.get(this.productsURL);
                this.uniqueProducts = response.data.data.products;
            } catch (error) {
                console.error('Error al cargar productos:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los productos'
                });
            }
        },
        async loadSuppliers() {
            try {
                const response = await axios.get(this.suppliersURL);
                this.uniqueSuppliers = response.data.data.suppliers;
            } catch (error) {
                console.error('Error al cargar proveedores:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los proveedores'
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
                status: 'pendiente'
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
                this.currentBuy = {
                    ...buyToEdit,
                    invoiceNumber: buyToEdit.invoice_number,
                    amount: this.calculateTotalAmount(buyToEdit)
                };
                this.isEditing = true;
                this.showModal = true;
            }
        },
        confirmUpdate() {
            Swal.fire({
                title: '¿Está seguro?',
                text: `¿Está seguro que desea ${this.isEditing ? 'actualizar' : 'guardar'} esta compra?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, continuar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.saveBuy();
                }
            });
        },
        async saveBuy() {
            try {
                if (!this.currentBuy.supplier || !this.currentBuy.department) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campos requeridos',
                        text: 'Por favor seleccione proveedor y departamento'
                    });
                    return;
                }

                if (this.currentBuy.buy_details.length === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sin detalles',
                        text: 'Debe agregar al menos un producto a la compra'
                    });
                    return;
                }

                const buyData = {
                    invoice_number: this.currentBuy.invoiceNumber,
                    date: this.currentBuy.date,
                    supplier_id: this.currentBuy.supplier.id,
                    department_id: this.currentBuy.department.id,
                    status: this.currentBuy.status,
                    buy_details: this.currentBuy.buy_details
                };

                if (this.isEditing) {
                    await axios.put(`${this.baseURL}/${this.currentBuy.id}`, buyData);
                } else {
                    await axios.post(this.baseURL, buyData);
                }

                await this.loadBuys();
                this.closeModal();

                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: `Compra ${this.isEditing ? 'actualizada' : 'creada'} correctamente`,
                    timer: 1500
                });

            } catch (error) {
                console.error('Error al guardar:', error);
                console.error('Respuesta del servidor:', error.response?.data);
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || `Error al ${this.isEditing ? 'actualizar' : 'crear'} la compra`
                });
            }
        },
        async deleteBuy(id) {
            const buy = this.buys.find(b => b.id === id);
            if (!buy) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea eliminar la compra con N° de Orden ${buy.invoice_number}?`,
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
                    await this.loadBuys();
                    Swal.fire(
                        'Eliminado',
                        `La compra con N° de Orden ${buy.invoice_number} ha sido eliminada con éxito`,
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar la compra'
                    });
                }
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
                this.updateTotalAmount();
                this.newDetail = { product_id: null, quantity: 0, buy_price: 0 };
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Por favor, complete todos los campos del detalle de compra'
                });
            }
        },
        updateTotalAmount() {
            this.currentBuy.amount = this.currentBuy.buy_details.reduce((total, detail) => {
                return total + (parseFloat(detail.buy_price) * detail.quantity);
            }, 0).toFixed(2);
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
        },
        getProductName(productId) {
            const product = this.uniqueProducts.find(p => p.id === productId);
            return product ? product.name : 'Producto no encontrado';
        },
        removeDetail(index) {
            this.currentBuy.buy_details.splice(index, 1);
            this.updateTotalAmount();
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