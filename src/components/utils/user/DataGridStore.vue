<template>
    <div class="container mt-5">
        <input
            type="text"
            class="form-control mb-3"
            placeholder="Buscar por nombre"
            v-model="searchQuery"
        />
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Estado</th>
                <th>Detalle</th>
                <th>Peso</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
                <td>{{ product.status }}</td>
                <td>{{ product.detail }}</td>
                <td>{{ product.weight }}</td>
                <td>{{ product.amount }}</td>
                <td>{{ product.price }}</td>
                <td>
                <button class="btn btn-primary btn-sm" @click="editproduct(product.id)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="deleteproduct(product.id)">Eliminar</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridStore',
    data() {
    return {
        searchQuery: '',
        product: [
        { id: 1, status: 'Procesado', detail: 'Ibuprofeno', weight: '200 gr', amount: 40, price: 110.1 },
        { id: 2, status: 'Procesado', detail: 'Acetaminofén', weight: '500 gr', amount: 220, price: 90 },
        ],
    };
    },
    computed: {
    filteredProducts() {
        return this.product.filter(product => {
        const fullDetail = `${product.status} ${product.detail}`.toLowerCase();
        return fullDetail.includes(this.searchQuery.toLowerCase());
        });
    },
    },
    methods: {
    editproduct(id) {
        alert(`Editar producto con ID: ${id}`);
        // Aquí puedes agregar la lógica para editar el usuario
    },
    deleteproduct(id) {
        alert(`Eliminar producto con ID: ${id}`);
        // Aquí puedes agregar la lógica para eliminar el usuario
    },
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>
