<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por Nombre, Apellido, Apodo o Identifición" v-model="searchQuery" />
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Pacientees" width="45" height="45" class="iconColor">
                    <b>Agregar Paciente</b>
                </button>
                <button class="btn btn-secondary btn-block" style="display: flex;" @click="openInactiveModal()">
                    <img src="/iconos/.svg" alt="Ver Inactivos" width="45" height="45" class="iconColor">
                    <b>Ver Inactivos</b>
                </button>
            </div>
        </div>

        <!-- Modal de Pacientees Inactivos -->
        <div v-if="showInactiveModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">Pacientes inactivos</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Identificación</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Apodo</th>
                            <th>Fecha Nacimiento</th>
                            <th>Género</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="patient in inactivePatients" :key="patient.id">
                            <td>{{ patient.identifier }}</td>
                            <td>{{ patient.firstName }}</td>
                            <td>{{ patient.lastName  }}</td>
                            <td>{{ patient.nickname }}</td>
                            <td>{{ patient.birthDate  }}</td>
                            <td>{{ patient.gender }}</td>
                            <td>
                                <button class="btn btn-success btn-sm" @click="activatePatient(patient.id)">
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

        <!---------------- Modal Agregar/Editar Paciente ---------------->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Paciente</h2>
                <form @submit.prevent="savePatient">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="identifier">Identificación</label>
                            <input type="text" id="identifier" v-model="currentPatient.identifier" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="nickname">Apodo</label>
                            <input type="text" id="nickname" v-model="currentPatient.nickname" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">Nombre</label>
                            <input type="text" id="firstName" v-model="currentPatient.firstName" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="lastName">Apellido</label>
                            <input type="text" id="lastName" v-model="currentPatient.lastName" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="birthDate">Fecha de Nacimiento</label>
                            <input type="date" id="birthDate" v-model="currentPatient.birthDate" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="status">Género</label>
                            <select id="status" v-model="currentPatient.gender" required class="form-control">
                                <option value=male>Masculino</option>
                                <option value=fermale>Femenino</option>
                                <option value=non-binary>No binario</option>
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
        <!---------------- Modal Agregar/Editar Paciente ---------------->

        <table class="table table-hover">
            <thead>
                <tr style="border-radius: 30px;">
                    <th>Identificación</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Apodo</th>
                    <th>Fecha Nacimiento</th>
                    <th>Género</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in activeFilteredPatients" :key="patient.id">
                    <td>{{ patient.identifier }}</td>
                    <td>{{ patient.firstName }}</td>
                    <td>{{ patient.lastName }}</td>
                    <td>{{ patient.nickname }}</td>
                    <td>{{ patient.birthDate  }}</td>
                    <td>{{ patient.gender.toLowerCase() }}</td>
                    <td>{{ patient.deletedAt ? 'Inactivo' : 'Activo' }}</td>
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
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'DataGridPatient',
    data() {
        return {
            searchQuery: '',
            showModal: false,
            isEditing: false,
            currentPatient: {
                id: null,
                rif: '',
                address: '',
                business_name: '',
                status: true
            },
            patients: [],
            baseURL: 'https://backend-hospital-mediplus.onrender.com/api/patient',
            showInactiveModal: false,
        };
    },
    computed: {
        filteredPatients() {
            return this.patients.filter(patient => {
                const searchString = `${patient.firstName} ${patient.lastName} ${patient.nickName} ${patient.nickName} ${patient.identifier}`.toLowerCase();
                return searchString.includes(this.searchQuery.toLowerCase());
            });
        },
        activeFilteredPatients() {
            return this.filteredPatients.filter(patient => !patient.deletedAt);
        },
        inactivePatients() {
            return this.patients.filter(patient => patient.deletedAt);
        }
    },
    async created() {
        await this.loadPatients();
    },
    methods: {
        async loadPatients() {
            try {
                const response = await axios.get(this.baseURL);
                console.log(response.data.data.patients)
                /*
                const formattedPatients = response.data.data.patients.map(patient => ({
                    identifier: patient.identifier,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    nickname: patient.nickname,
                    birthDate: new Date(patient.birthDate).toLocaleDateString('es-ES'),
                    gender: patient.gender.toLowerCase(),
                    deletedAt: patient.deletedAt,
                }));*/

                this.patients = response.data.data.patients;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los pacientees'
                });
            }
        },

        async savePatient() {
            try {
                const patientData = {
                    identifier : this.currentPatient.identifier,
                    firstName : this.currentPatient.firstName,
                    lastName : this.currentPatient.lastName,
                    nickname : this.currentPatient.nickname,
                    birthDate : this.currentPatient.birthDate,
                    gender: this.currentPatient.gender
                };

                const existingPatient = this.patients.find(s => 
                    s.identifier === patientData.identifier && 
                    (!this.isEditing || s.id !== this.currentPatient.id)
                );

                if (existingPatient) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'Ya existe un paciente con esta identificación'
                    });
                    return;
                }

                if (this.isEditing) {
                    await axios.put(`${this.baseURL}/${this.currentPatient.id}`, {
                        ...patientData,
                        status: this.currentPatient.status
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Paciente actualizado con éxito'
                    });
                } else {
                    await axios.post(this.baseURL, patientData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Paciente creado con éxito'
                    });
                }
                
                await this.loadPatients();
                this.closeModal();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'Error al guardar el paciente'
                });
            }
        },

        async deletePatient(id) {
            const patient = this.patients.find(s => s.id === id);
            if (!patient) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea eliminar el paciente con identificacion: ${patient.identifier}?`,
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
                    await this.loadPatients();
                    Swal.fire(
                        'Eliminado',
                        `El paciente ${patient.identifier} ha sido eliminado con éxito`,
                        'success'
                    );
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al eliminar el paciente'
                    });
                }
            }
        },

        openModal() {
            this.isEditing = false;
            this.currentPatient = {
                identifier : null,
                firstName : "",
                lastName : "",
                nickname : "",
                birthDate : "",
                gender:"",
                deletedAt:null
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.isEditing = false;
        },
        async editPatient(id) {
            try {
                const response = await axios.get(`${this.baseURL}/${id}`);
                const patientData = response.data.data.patient || response.data.data;
                this.currentPatient = {
                    identifier : patientData.identifier,
                    firstName : patientData.firstName,
                    lastName : patientData.lastName,
                    nickname : patientData.nickname,
                    birthDate : patientData.birthDate,
                    gender: patientData.gender,
                    deletedAt:patientData.deletedAt
                };
                this.isEditing = true;
                this.showModal = true;
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al obtener los datos del paciente'
                });
            }
        },
        openInactiveModal() {
            this.showInactiveModal = true;
        },
        closeInactiveModal() {
            this.showInactiveModal = false;
        },
        async activatePatient(id) {
            try {
                const patient = this.patients.find(s => s.id === id);
                if (patient) {
                    await axios.put(`${this.baseURL}/${id}`, {
                        ...patient,
                        deletedAt: null,
                        status: true
                    });
                    await this.loadPatients();
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Paciente activado con éxito'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al activar el paciente'
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