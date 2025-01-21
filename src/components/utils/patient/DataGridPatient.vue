<template>
    <div class="container mt-5">
        <div class="input-group mb-3">
            <div class="col-md-11"> 
                <input type="text" class="form-control" placeholder="Buscar por nombre o apellido" v-model="searchQuery" /> 
            </div>
            <div class="col-md-1"> 
                <button class="btn btn-success btn-sm" @click="addPatient">Agregar</button> 
            </div>
        </div>
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
                <tr v-for="patient in filteredPatients" :key="patient.id">
                    <td>{{ patient.firstName }}</td>
                    <td>{{ patient.lastName }}</td>
                    <td>{{ patient.birthDate }}</td>
                    <td>{{ patient.age }}</td>
                    <td>{{ patient.gender }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editPatient(patient.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deletePatient(patient.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataGridPatient',
    data() {
        return {
            searchQuery: '',
            patients: [
                { id: 1, firstName: 'Sofía', lastName: 'Ramírez', birthDate: '1992-03-14', age: 32, gender: 'Femenino' },
                { id: 2, firstName: 'Miguel', lastName: 'Torres', birthDate: '1980-11-22', age: 44, gender: 'Masculino' },
                { id: 3, firstName: 'Lucía', lastName: 'Fernández', birthDate: '2005-07-08', age: 19, gender: 'Femenino' },
                { id: 4, firstName: 'Diego', lastName: 'García', birthDate: '1998-12-30', age: 26, gender: 'Masculino' },
                { id: 5, firstName: 'Valentina', lastName: 'Morales', birthDate: '1975-05-05', age: 49, gender: 'Femenino' },
            ]

        };
    },
    computed: {
        filteredPatients() {
            return this.patients.filter(patient => {
                const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
                return fullName.includes(this.searchQuery.toLowerCase());
            });
        },
    },
    methods: {
        editPatient(id) {
            alert(`Editar paciente con ID: ${id}`);
            // Aquí puedes agregar la lógica para editar el paciente
        },
        deletePatient(id) {
            alert(`Eliminar paciente con ID: ${id}`);
            // Aquí puedes agregar la lógica para eliminar el paciente
        },
    },
};
</script>

<style scoped>
.table {
    margin-top: 20px;
}
</style>
