<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar..." v-model="searchQuery" />
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
                            <label for="type">Buscar Cliente</label>
                            <select id="description" v-model="currentsales.client_id" required class="form-control">
                                <option value="" disabled selected>Selecciona una opción</option> <!-- Opción por defecto -->
                                <option v-for="clients in localClients" :key="clients.id" :value="clients.id">{{ clients.name }} {{ clients.last_name }}</option>
                                <!-- Agrega más opciones según sea necesario -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="type">Buscar Paciente</label>
                            <select id="description" v-model="currentsales.patient_id" required class="form-control">
                                <option value="" disabled selected>Selecciona una opción</option> <!-- Opción por defecto -->
                                <option v-for="patient in localPatients" :key="patient.id" :value="patient.id">{{ patient.firstName }} {{ patient.lastName }}</option>
                                <!-- Agrega más opciones según sea necesario -->
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="type">Buscar Producto</label>
                            <select id="description" v-model="currentsales.product_id" required class="form-control">
                                <option value="" disabled selected>Selecciona una opción</option> <!-- Opción por defecto -->
                                <option v-for="products in localProducts" :key="products.id" :value="products.id">{{ products.name }}</option>
                                <!-- Agrega más opciones según sea necesario -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="type">Método de Pago</label>
                            <select id="description" v-model="currentsales.payment_type_id" required class="form-control">
                                <option value="" disabled selected>Selecciona una opción</option>
                                <option v-for="payment in localPayments" :key="payment.id" :value="payment.id">{{ payment.description }}</option>
                                <!-- Agrega más opciones según sea necesario -->
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="price">Precio</label>
                            <input type="number" id="price" v-model="currentsales.price" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="quantity">Cantidad</label>
                            <input type="number" id="quantity" v-model="currentsales.quantity" required class="form-control">
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
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Nro. Factura</th>
                    <th>Monto</th>
                    <th>Estatus</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sales in filteredsales" :key="sales.id">
                    <td>{{ sales.billing_date }}</td>
                    <td>{{ sales.client?.name }} {{ sales.client?.last_name }}</td>
                    <td>{{ sales.num_fact }}</td>
                    <td>{{ sales.sale?.amount || 0 }}</td>
                    <td>{{ sales.billing_status }}</td>
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
    name: 'DataGridSales',
    mixins: [authGuard],
    props: {
        sales: {
            type: Array,
            required: false
        },
        clients: {
            type: Array,
            required: false
        },
        products: {
            type: Array,
            required: false
        },
        patients: {
            type: Array,
            required: false
        },
        payments: {
            type: Array,
            required: false
        },
    },
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentsales: {
                id: null,
                client_id: '',
                product_id: '',
                patient_id: '',
                quantity: 1,
                price:0.0
            },
            localSales: [],
            localClients: [],
            localProducts: [],
            localPatients: [],
            localPayments: [],
        };
    },
    watch: {
        // Observar cambios en la prop sales
        sales: {
            immediate: true, // Esto hace que el watcher se ejecute inmediatamente
            handler(newSales) {
                if (newSales) {
                    this.localSales = newSales.map(sale => ({
                        ...sale,
                        sale: sale.sale || { amount: 0 },
                        client: sale.client || { name: '', last_name: '' }
                    }));
                }
            }
        },
        clients: {
            immediate: true, // Esto hace que el watcher se ejecute inmediatamente
            handler(newClient) {
                if (newClient) {
                    this.localClients = newClient.map(client => ({
                        ...client,
                    }));
                }
            }
        },
        products: {
            immediate: true, // Esto hace que el watcher se ejecute inmediatamente
            handler(newProducts) {
                if (newProducts) {
                    this.localProducts = newProducts.map(Products => ({
                        ...Products,
                    }));
                }
            }
        },
        patients: {
            immediate: true, // Esto hace que el watcher se ejecute inmediatamente
            handler(newPatient) {
                if (newPatient) {
                    this.localPatients = newPatient.map(Patient => ({
                        ...Patient,
                    }));
                }
            }
        },
        payments: {
            immediate: true, // Esto hace que el watcher se ejecute inmediatamente
            handler(newPayment) {
                if (newPayment) {
                    this.localPayments = newPayment.map(Payment => ({
                        ...Payment,
                    }));
                }
            }
        },
    },
    created() {
        // Copia los datos de la prop sales a localSales
        this.localSales = this.sales.map(sale => ({
            ...sale,
            sale: sale.sale || { amount: 0 },
            client: sale.client || { name: '', last_name: '' }
        }));
        this.localClients = [...this.clients];
        this.localProducts = [...this.products];
        this.localPatients = [...this.patients];
        this.localPayments = [...this.payments];
        //console.log(this.localSales)
        //this.localBillingDetail = [...this.billingDetail];
    },
    computed: {
        filteredsales() {
            return this.localSales.map(sales => ({
                ...sales,
                sale: sales.sale || { amount: 0 }, // Si sale es null, proporciona un objeto por defecto
                client: sales.client || { name: '', last_name: '' }, // Si client es null, proporciona un objeto por defecto
            })).filter(sales => {
                const searchString = `${sales.billing_date || ''} ${sales.client.name || ''} ${sales.client.last_name || ''} ${sales.num_fact || ''} ${sales.sale.amount || 0} ${sales.billing_status || ''}`.toLowerCase();
                return searchString.includes(this.searchQuery.toLowerCase());
            });
        }
    },
    methods: {
        openModal() {
            this.isEditing = false;
            this.currentsales = {
                id: null,
                client_id: '',
                product_id: '',
                quantity: 1,
                price:0.0
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
            this.currentsales = {
                id: null,
                client_id: '',
                product_id: '',
                patient_id: '',
                quantity: 1,
                price: 0.0,
                payment_type_id: ''
            };
        },
        async savesales() {
            try {
                // Validar datos antes de enviar
                if (!this.currentsales.client_id || 
                    !this.currentsales.product_id || 
                    !this.currentsales.payment_type_id ||
                    !this.currentsales.quantity ||
                    !this.currentsales.price) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campos requeridos',
                        text: 'Por favor complete todos los campos obligatorios'
                    });
                    return;
                }

                let form = {
                    patient_id: this.currentsales.patient_id,
                    client_id: this.currentsales.client_id,
                    BillingDetails: [
                        {
                            product_id: this.currentsales.product_id,
                            quantity: this.currentsales.quantity,
                            price: this.currentsales.price,
                        }
                    ],
                    payment_type_id: this.currentsales.payment_type_id,
                }

                console.log('Datos a enviar:', form);

                const response = await axios.post('https://backend-hospital-mediplus.onrender.com/api/billing', form);
                console.log('Respuesta del servidor:', response.data);

                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Venta creada con éxito',
                    timer: 1500
                });

                // Actualizar la lista de ventas
                if (response.data) {
                    // Agregar la nueva venta al array local
                    this.localSales.push({
                        id: response.data.id,
                        billing_date: new Date().toISOString(),
                        client: this.localClients.find(c => c.id === this.currentsales.client_id),
                        num_fact: response.data.num_fact || '',
                        sale: {
                            amount: this.currentsales.price * this.currentsales.quantity
                        },
                        billing_status: 'Completado'
                    });
                }

                // Cerrar el modal y limpiar el formulario
                this.closeModal();

                // Emitir evento para actualizar la vista padre si es necesario
                this.$emit('sale-added');

            } catch (error) {
                console.error('Error completo:', error);
                console.error('Respuesta del servidor:', error.response?.data);
                
                let errorMessage = 'Error al guardar la venta';
                
                if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
                    errorMessage = error.response.data.errors
                        .map(err => {
                            if (typeof err === 'string') return err;
                            return err.msg || err.message || JSON.stringify(err);
                        })
                        .filter(Boolean)
                        .join('\n');
                } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    html: errorMessage.replace(/\n/g, '<br>'),
                    confirmButtonText: 'Entendido'
                });
            }
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