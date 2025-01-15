<template>
    <div class="container mt-5">
        <input
            type="text"
            class="form-control mb-3"
            placeholder="Buscar por nombre o apellido"
            v-model="searchQuery"
        />
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.birthDate }}</td>
                <td>{{ user.age }}</td>
                <td>{{ user.gender }}</td>
                <td>
                <button class="btn btn-primary btn-sm" @click="editUser(user.id)">Editar</button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Eliminar</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridUser',
    data() {
    return {
        searchQuery: '',
        users: [
        { id: 1, firstName: 'Juan', lastName: 'Pérez', birthDate: '1990-01-01', age: 33, gender: 'Masculino' },
        { id: 2, firstName: 'María', lastName: 'Gómez', birthDate: '1985-05-15', age: 38, gender: 'Femenino' },
        { id: 3, firstName: 'Carlos', lastName: 'López', birthDate: '2000-10-20', age: 22, gender: 'Masculino' },
        { id: 4, firstName: 'Ana', lastName: 'Martínez', birthDate: '1995-03-30', age: 28, gender: 'Femenino' },
        { id: 5, firstName: 'Luis', lastName: 'Hernández', birthDate: '1988-07-25', age: 35, gender: 'Masculino' },
        ],
    };
    },
    computed: {
    filteredUsers() {
        return this.users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
        });
    },
    },
    methods: {
    editUser(id) {
        alert(`Editar usuario con ID: ${id}`);
        // Aquí puedes agregar la lógica para editar el usuario
    },
    deleteUser(id) {
        alert(`Eliminar usuario con ID: ${id}`);
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
