<template>
    <div class="container mt-5">
        <div class="input-group mb-3">
            <div class="col-md-11"> 
                <input type="text" class="form-control" placeholder="Buscar por RIF, direccion o razon social" v-model="searchQuery" /> 
            </div>
            <div class="col-md-1"> 
                <button class="btn btn-success btn-sm" @click="addSupplier">Agregar</button> 
            </div>
        </div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>RIF</th>
                    <th>Direccion</th>
                    <th>Razon Social</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="supplier in filteredSuppliers" :key="supplier.id">
                    <td>{{ supplier.rif }}</td>
                    <td>{{ supplier.address }}</td>
                    <td>{{ supplier.businessName }}</td>
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
import router from '@/router';
export default {
    name: 'DataGridSupplier',
    data() {
        return {
            searchQuery: '',
            suppliers: [
                { id: 1, rif: '123456789', address: 'Calle Principal 123', businessName: 'Empresa A' },
                { id: 2, rif: '987654321', address: 'Avenida Central 456', businessName: 'Empresa B' },
                { id: 3, rif: '555555555', address: 'Calle Secundaria 789', businessName: 'Empresa C' },
                { id: 4, rif: '111111111', address: 'Avenida Principal 321', businessName: 'Empresa D' },
                { id: 5, rif: '222222222', address: 'Calle Central 654', businessName: 'Empresa E' },
            ]

        };
    },
    computed: {
        filteredSuppliers() {
            return this.suppliers.filter(supplier => {
                const fullName = `${supplier.firstName} ${supplier.lastName}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        editSupplier(id) {
            this.$router.push({
                name: 'editSupplier',
                params: { id, isEditing: true }
      })
  },
        deleteSupplier(id) {
            alert(`Eliminar proveedor con ID: ${id}`);
        },
        addSupplier() {
            router.push({ name: 'addSupplier' });
        }
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>