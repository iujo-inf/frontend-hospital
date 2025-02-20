<template>
    <div class="container mt-5">
        <div class="grid-view">
            <input type="text" class="form-control mb-3"
                placeholder="Buscar por nombre, apellidos o cédula" v-model="searchQuery" />
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary btn-block" style="display: flex;" @click="openModal()">
                    <img src="/iconos/agregar.svg" alt="Pacientes" width="45" height="45" class="iconColor">
                    <b>Agregar Paciente</b>
                </button>
            </div>
        </div>

        <!-- Modal Agregar/Editar Paciente -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h2 class="modal-title">{{ isEditing ? 'Editar' : 'Agregar' }} Paciente</h2>
                <form @submit.prevent="savePatient">
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
                            <label for="gender">Sexo</label>
                            <select id="gender" v-model="currentPatient.gender" required class="form-control">
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="identifier">Cédula</label>
                            <input type="text" id="identifier" v-model="currentPatient.identifier" required class="form-control">
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
                <tr style="border-radius: 30px;">
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Sexo</th>
                    <th>Fecha de registro</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in filteredPatients" :key="patient.id">
                    <td>{{ patient.identifier || 'N/A' }}</td>
                    <td>{{ patient.firstName || 'N/A' }}</td>
                    <td>{{ patient.lastName || 'N/A' }}</td>
                    <td>{{ patient.birthDate || 'N/A' }}</td>
                    <td>{{ patient.gender || 'N/A' }}</td>
                    <td>{{ patient.registrationDate || 'N/A' }}</td>
                    <td>
                        <button class="btn btn-success btn-sm" @click="editPatient(patient.id)">
                            Editar
                        </button>
                        <button class="btn btn-danger btn-sm" @click="deletePatient(patient.id)">
                            Eliminar
                        </button>
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
                firstName: '',
                lastName: '',
                birthDate: '',
                gender: 'masculino',
                identifier: '',
            },
            patients: [],
            baseURL: 'https://backend-hospital-mediplus.onrender.com/api/patient',
        };
    },
    computed: {
        filteredPatients() {
            const patientsArray = Array.isArray(this.patients) ? this.patients : [];
            
            if (!this.searchQuery) {
                return patientsArray;
            }

            const searchTerm = this.searchQuery.toLowerCase().trim();
            return patientsArray.filter(patient => {
                if (!patient) return false;
                
                const searchableFields = [
                    patient.identifier,
                    patient.firstName,
                    patient.lastName
                ];
                
                return searchableFields.some(field => 
                    field && field.toString().toLowerCase().includes(searchTerm)
                );
            });
        }
    },
    created() {
        this.patients = [];
        this.loadPatients();
    },
    methods: {
        async loadPatients() {
            try {
                const response = await axios.get(this.baseURL);
                console.log('Respuesta API completa:', response);

                if (!response || !response.data) {
                    console.warn('No se recibieron datos de la API');
                    this.patients = [];
                    return;
                }

                let rawData = response.data;
                console.log('Datos sin procesar:', rawData);

                // Extraer el array de patients de la estructura correcta
                let patientsArray = [];
                if (rawData.data && rawData.data.patients && Array.isArray(rawData.data.patients)) {
                    patientsArray = rawData.data.patients;
                } else if (rawData.data && Array.isArray(rawData.data)) {
                    patientsArray = rawData.data;
                } else if (Array.isArray(rawData)) {
                    patientsArray = rawData;
                }

                // Agregar este log después de extraer patientsArray
                console.log('Array de pacientes antes de procesar:', patientsArray);

                // Procesar los datos
                this.patients = patientsArray
                    .filter(item => item && typeof item === 'object')
                    .map(patient => ({
                        id: patient._id || patient.id,
                        firstName: patient.firstName || '',
                        lastName: patient.lastName || '',
                        birthDate: patient.birthDate || '',
                        gender: patient.gender || '',
                        identifier: patient.identifier || '',
                        registrationDate: patient.registrationDate || ''
                    }));

                console.log('Patients después de asignar:', this.patients);

            } catch (error) {
                console.error('Error al cargar pacientes:', error);
                this.patients = [];
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los pacientes'
                });
            }
        },

        async savePatient() {
            let patientData = null;

            try {
                // Validar datos antes de enviar
                if (!this.currentPatient.firstName || 
                    !this.currentPatient.lastName || 
                    !this.currentPatient.identifier ||
                    !this.currentPatient.birthDate ||
                    !this.currentPatient.gender) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campos requeridos',
                        text: 'Por favor complete todos los campos obligatorios'
                    });
                    return;
                }

                // Validar formato de cédula (solo números)
                if (!/^\d+$/.test(this.currentPatient.identifier)) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Formato inválido',
                        text: 'La cédula debe contener solo números'
                    });
                    return;
                }

                // Validar fecha de nacimiento
                const birthDate = new Date(this.currentPatient.birthDate);
                const today = new Date();
                if (birthDate > today) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Fecha inválida',
                        text: 'La fecha de nacimiento no puede ser futura'
                    });
                    return;
                }

                // Modificar la estructura de los datos para que coincida con el backend
                patientData = {
                    nickname: this.currentPatient.firstName.trim(),
                    firstName: this.currentPatient.firstName.trim(),
                    lastName: this.currentPatient.lastName.trim(),
                    birthDate: this.formatDate(this.currentPatient.birthDate),
                    gender: this.currentPatient.gender.toLowerCase(),
                    identifier: this.currentPatient.identifier.trim(),
                    type: 'patient',
                    status: true
                };

                console.log('Datos a enviar:', patientData);

                let response;
                if (this.isEditing) {
                    response = await axios.put(
                        `${this.baseURL}/${this.currentPatient.id}`, 
                        patientData
                    );
                } else {
                    response = await axios.post(
                        this.baseURL, 
                        patientData
                    );
                }

                console.log('Respuesta del servidor:', response.data);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: this.isEditing ? 'Paciente actualizado con éxito' : 'Paciente creado con éxito'
                });

                await this.loadPatients();
                this.closeModal();
            } catch (error) {
                console.error('Error completo:', error);
                console.error('Datos que se intentaron enviar:', patientData);
                console.error('Respuesta del servidor:', error.response?.data);
                
                let errorMessage = 'Error al guardar el paciente';
                
                if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
                    // Mostrar todos los errores del array
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

        // Agregar método para formatear fecha
        formatDate(dateString) {
            if (!dateString) return null;
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        },

        async deletePatient(id) {
            const patient = this.patients.find(p => p.id === id);
            if (!patient) return;

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: `¿Desea eliminar el paciente con cédula: ${patient.identifier}?`,
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
                id: null,
                firstName: '',
                lastName: '',
                birthDate: '',
                gender: 'masculino',
                identifier: '',
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
                const patientData = response.data;
                this.currentPatient = {
                    id: patientData.id,
                    firstName: patientData.firstName,
                    lastName: patientData.lastName,
                    birthDate: patientData.birthDate,
                    gender: patientData.gender,
                    identifier: patientData.identifier,
                    registrationDate: patientData.registrationDate
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
                const patient = this.patients.find(p => p.id === id);
                if (patient) {
                    await axios.put(`${this.baseURL}/${id}`, {
                        ...patient,
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
    watch: {
        patients: {
            handler(newVal) {
                console.log('patients changed:', {
                    isArray: Array.isArray(newVal),
                    value: newVal,
                    length: newVal?.length
                });
            },
            immediate: true
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